const env                     = require('dotenv').config()

const path             = require('path')
const htmlStandards    = require('reshape-standard')
const sugarml          = require('sugarml')
const sugarss          = require('sugarss')
const cssStandards     = require('spike-css-standards')
const jsStandards      = require('babel-preset-latest')
const pageId           = require('spike-page-id')
const df                      = require('dateformat')
const dateFns                      = require('date-fns')

const SpikeDatoCMS            = require('spike-datocms')
const postcssMixins           = require('postcss-mixins')
const locals           = { }


var offset = -4;
const Dato = new SpikeDatoCMS({
  addDataTo: locals,
  token: process.env.dato_api_key,
  models: [{
    name: 'event',
    transform: (data) => {
      if (data.startDateTime) {
        startDateHours = new Date(new Date(data.startDateTime).getTime() + offset * 3600 * 1000).toUTCString()
        data.startDateTime = startDateHours
      }
      if (data.endDateTime) {
        endDateHours = new Date( new Date(data.endDateTime).getTime() + offset * 3600 * 1000).toUTCString()
        data.endDateTime = endDateHours
      }
      if (dateFns.isPast(data.endDateTime)) {
        data.past = true
      }
      else {
        data.past = false
      }
      return data
    }
  }]
})

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.css' },
  vendor: 'assets/js/vendor/**',
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards ({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(locals,
      { pageId: pageId(ctx) },
      { df: df.bind(df) },
      { dateFns: dateFns }

    )},
    retext: { quotes: false }
  }),
  postcss: cssStandards({
    warnForDuplicates: env !== 'production',
    appendPlugins: postcssMixins()
  }),
  babel: jsStandards(),
  plugins: [ Dato ]

}
