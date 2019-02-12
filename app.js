const env                     = require('dotenv').config()

const path                    = require('path')
const htmlStandards           = require('reshape-standard')
const cssStandards            = require('spike-css-standards')
const jsStandards             = require('spike-js-standards')
const pageId                  = require('spike-page-id')
const df                      = require('dateformat')
const numeral                 = require('numeral');
const dateFns                 = require('date-fns')
const slugify                 = require('slugify')

const SpikeDatoCMS            = require('spike-datocms')
const postcssMixins           = require('postcss-mixins')
const CopyWebpackPlugin       = require('copy-webpack-plugin')
const MarkdownIt              = require('markdown-it')
const markdownItTocAndAnchor  = require('markdown-it-toc-and-anchor').default
const markdownItAttrs         = require('markdown-it-attrs')
const markdownItContainer     = require('markdown-it-container')
const {DateTime,Settings}     = require('luxon')
const dateFnsTz               = require('date-fns-tz')

const tz = "America/New_York"

Settings.defaultZoneName = tz

const md = new MarkdownIt()
.use(markdownItTocAndAnchor, {
  tocFirstLevel: 3,
  anchorLink: true
})
.use(markdownItContainer, 'image')
.use(markdownItAttrs)

const locals           = { }

var npRate = .35
var serviceNpRate = .75
var staffRate = 30
var now = DateTime.local();
var nowParsed = now.toISO()

const Dato = new SpikeDatoCMS({
  // drafts: true,
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [
    {
      name: 'article',
      template: {
        path: 'views/_article.html',
        output: (article) => {
          return `news/${article.slug}.html`
        }
      }
    },
    {
      name: 'press_link'
    },
    {
      name: 'service',
      transform: (data) => {
        if (data.options) {
          const options = data.options
          options.forEach(function (option, index) {
            option.npRate = numeral(Math.round(option.rate * serviceNpRate)).format('$0,0[.]00')
            option.rate = numeral(Math.round(option.rate)).format('$0,0[.]00')
          })
        }
        return data
      }
    },
    {
      name: 'rental_period'
    },
    {
      name: 'room',
      transform: (data) => {
        if (data.rates) {
          const rates = data.rates
          rates.forEach(function (rate, index) {
            if (rate.period.extraHours) {
              staffingCost = rate.period.extraHours * staffRate
              rate.npRate = numeral(Math.round((rate.rate * npRate) + staffingCost)).format('$0,0[.]00')
              rate.rate = numeral(Math.round(rate.rate + staffingCost)).format('$0,0[.]00')
            }
            else {
              rate.npRate = numeral(Math.round(rate.rate * npRate)).format('$0,0[.]00')
              rate.rate = numeral(Math.round(rate.rate)).format('$0,0[.]00')
            }
          })
        }
        return data
      }
    },
    {
      name: 'event',
      template: {
        path: 'views/_event.html',
        output: (event) => {
          if (event.slug) {
            return `event/${event.slug}.html`
          }
          else {
            return `event/${slugify(event.title, {
              replacement: '-',
              remove: /[*+~.()#'"!:@]/g,
              lower: true })
            }.html`
          }
        }
      },
      transform: (data) => {

        if(data.member[0] && data.presenter)  {
          data.organizer = `${data.member[0].name} + ${data.presenter}`
        }
        else if(data.member[0]) {
          data.organizer = `${data.member[0].name}`
        }
        else if(data.presenter) {
          data.organizer = `${data.presenter}`
        }
        if (!data.slug) {
          data.slug = slugify(data.title, {
            replacement: '-',
            remove: /[*+~.()#'"!:@]/g,
            lower: true
          })
        }
        if (dateFns.isBefore(dateFns.parseISO(data.startDateTime), new Date())) {
          data.past = true
        }
        else {
          data.past = false
        }
        if (data.startDateTime) {
          data.startTimestamp =  df(data.startDateTime, "yyyymmdd'T'HHMMss'Z'")
          data.startDateTimeParsed = dateFns.parseISO(data.startDateTime)
          data.startDateTime = DateTime.fromISO(data.startDateTime);
          // console.log(data.startDateTimeParsed)
        }
        if (data.endDateTime) {
          data.endTimestamp =  df(data.endDateTime, "yyyymmdd'T'HHMMss'Z'")
          data.endDateTimeParsed = dateFns.parseISO(data.endDateTime)
          data.endDateTime = DateTime.fromISO(data.endDateTime);
        }

        var zonedStart = dateFnsTz.utcToZonedTime(data.startDateTimeParsed, 'America/New_York')
        var zonedEnd = dateFnsTz.utcToZonedTime(data.endDateTimeParsed, 'America/New_York')

        if (data.endDateTime && data.startDateTime) {
          // todo: make this a function so it can be reused in program
          if (dateFns.isSameDay(zonedStart,zonedEnd) == true) {
            data.humanTime = `${data.startDateTime.toFormat('LLLL d, h:mm a')}`
          }
          else if (dateFns.isSameMonth(zonedStart,zonedEnd) == true) {
            data.humanTime = `${data.startDateTime.toLocaleString({ month: 'long', day: 'numeric' })}–${data.endDateTime.toLocaleString({ day: 'numeric' })}`
          }
          else {
            data.humanTime = `${data.startDateTime.toLocaleString({ month: 'long', day: 'numeric' })}–${data.endDateTime.toLocaleString({ month: 'long', day: 'numeric' })}`
          }

          return data
        }
      }
    },
    {
      name: 'program',
      template: {
        path: 'views/_program.html',
        output: (program) => { return `program/${program.slug}.html` }
      },
      transform: (data) => {
        var endOfDayEndDate = dateFns.endOfDay(dateFns.parseISO(data.endDate))

        if (dateFns.isBefore(endOfDayEndDate, new Date())) {
          data.past = true
        }
        else {
          data.past = false
        }



        if (data.startDate) {

          data.startTimestamp = df(data.startDate, "yyyymmdd")
          data.startDateParsed = dateFns.parseISO(data.startDate)
          data.startDate = DateTime.fromISO(data.startDate);
          // data.startDate = data.startDate.toLocaleString(DateTime.DATETIME_FULL)
          var zonedStart = dateFnsTz.utcToZonedTime(data.startDateParsed, 'America/New_York')

        }
        if (data.endDate) {
          data.endTimestamp = df(data.endDate, "yyyymmdd")
          data.endDateParsed = dateFns.parseISO(data.endDate)
          data.endDate = DateTime.fromISO(data.endDate);
          // data.endDate = data.endDate.toLocaleString(DateTime.DATETIME_FULL)
          var zonedEnd = dateFnsTz.utcToZonedTime(data.endDateParsed, 'America/New_York')
        }
        // todo: check year here someday
        if (dateFns.isSameDay(zonedStart,zonedEnd) == true) {
          data.humanTime = `${data.startDate.toFormat('LLLL d')}`
        }
        else if (dateFns.isSameMonth(zonedStart,zonedEnd) == true) {
          data.humanTime = `${data.startDate.toFormat('LLLL d')}–${data.endDate.toFormat('dd')}`
          console.log(data.humanTime)
        }
        else {
          data.humanTime = `${data.startDate.toLocaleString({ month: 'long', day: 'numeric' })}–${data.endDate.toLocaleString({ month: 'long', day: 'numeric' })}`
          console.log(`${data.title}: ${data.humanTime}`)
        }


        return data
      }
    }
  ]
})

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.html', css: '*(**/)*.css', js: '*(**/)*.js' },
  vendor: 'assets/js/vendor/**',
  ignore: ['_*.html', '**/layout.html','**/*.sgr','**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards ({
    locals: (ctx) => { return Object.assign(locals
      , { atom: '?xml version="1.0" encoding="utf-8"?' }
      , { pageId: pageId(ctx) }
      , { df: df.bind(df) }
      , { numeral: numeral.bind(numeral) }
      , { DateTime: DateTime }
      , { dateFns: dateFns }
      , { md: md.render.bind(md) }
      , { now: now}
      , { nowParsed: nowParsed}
    )},
    markdownPlugins: [ [markdownItTocAndAnchor, { tocFirstLevel: 3, anchorLink: false }],markdownItAttrs, markdownItContainer ],
    retext: { quotes: false }
  }),
  postcss: cssStandards({
    warnForDuplicates: env !== 'production',
    appendPlugins: postcssMixins()
  }),
  babel: jsStandards(),
  plugins: [
    Dato
  ]}
