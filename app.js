const env                     = require('dotenv').config()

const path                    = require('path')
const htmlStandards           = require('reshape-standard')
const cssStandards            = require('spike-css-standards')
const jsStandards             = require('spike-js-standards')
const pageId                  = require('spike-page-id')
const df                      = require('dateformat')
const numeral                 = require('numeral');
const dateFns                 = require('date-fns')

const SpikeDatoCMS            = require('spike-datocms')
const postcssMixins           = require('postcss-mixins')

const MarkdownIt              = require('markdown-it')
const markdownItTocAndAnchor  = require('markdown-it-toc-and-anchor').default
const markdownItAttrs         = require('markdown-it-attrs')
const markdownItContainer     = require('markdown-it-container')

const md = new MarkdownIt()
.use(markdownItTocAndAnchor, {
  tocFirstLevel: 3,
  anchorLink: true
})
.use(markdownItContainer)

const locals           = { }
const DefinePlugin = require('webpack').DefinePlugin

var offset = -4;
var npRate = .35
var serviceNpRate = .75
var staffRate = 30
const Dato = new SpikeDatoCMS({
  // drafts: true,
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [
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
      transform: (data) => {
        if (dateFns.isPast(data.endDateTime)) {
          data.past = true
        }
        else {
          data.past = false
        }
        if (data.startDateTime) {
          startDateHours = new Date(new Date(data.startDateTime).getTime() + offset * 3600 * 1000).toUTCString()
          data.startDateTime = startDateHours
        }
        if (data.endDateTime) {
          endDateHours = new Date( new Date(data.endDateTime).getTime() + offset * 3600 * 1000).toUTCString()
          data.endDateTime = endDateHours
        }

        return data
      }
    },
    {
      name: 'program',
      template: {
        path: 'views/_program.html',
        output: (program) => { return `program/${program.slug}.html` }
      },
      transform: (data) => {
        var endOfDayEndDate = dateFns.endOfDay(data.endDate)
        if (dateFns.isPast(endOfDayEndDate)) {
          data.past = true
        }
        else {
          data.past = false
        }
        if (data.startDate) {
          startDateHours = new Date(new Date(data.startDate).getTime() + 0 * 3600 * 1000).toUTCString()
          data.startDate = startDateHours
        }
        if (data.endDate) {
          endDateHours = new Date( new Date(data.endDate).getTime() + 0 * 3600 * 1000).toUTCString()
          data.endDate = endDateHours
          data.endOfDayEndDate = endOfDayEndDate
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
      , { pageId: pageId(ctx) }
      , { df: df.bind(df) }
      , { numeral: numeral.bind(numeral) }
      , { dateFns: dateFns }
      , { md: md.render.bind(md) }
    )},
    markdownPlugins: [ [markdownItTocAndAnchor, { tocFirstLevel: 3 }],markdownItAttrs, markdownItContainer ],
    retext: { quotes: false }
  }),
  postcss: cssStandards({
    warnForDuplicates: env !== 'production',
    appendPlugins: postcssMixins()
  }),
  babel: jsStandards(),
  plugins: [ Dato, new DefinePlugin({
    locals
  })
]
}
