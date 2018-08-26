const env                     = require('dotenv').config()

const path                    = require('path')
const htmlStandards           = require('reshape-standard')
const sugarml                 = require('sugarml')
const sugarss                 = require('sugarss')
const cssStandards            = require('spike-css-standards')
const jsStandards             = require('spike-js-standards')
const pageId                  = require('spike-page-id')
const df                      = require('dateformat')
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
const Dato = new SpikeDatoCMS({
  // drafts: true,
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [
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
        path: 'views/_program.sgr',
        output: (program) => { return `program/${program.slug}.html` }
      },
      transform: (data) => {
        if (dateFns.isPast(data.endDate)) {
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
        }
        return data
      }
    }
  ]
})

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.css', js: '*(**/)*.js' },
  vendor: 'assets/js/vendor/**',
  ignore: ['**/layout.sgr', '**/_layout.sgr', '**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards ({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(locals
      , { pageId: pageId(ctx) }
      , { df: df.bind(df) }
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
