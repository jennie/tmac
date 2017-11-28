const path             = require('path')
// const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards    = require('reshape-standard')
const sugarml          = require('sugarml')
const sugarss          = require('sugarss')

const postcss          = require('postcss')
const cssStandards     = require('spike-css-standards')
const jsStandards      = require('babel-preset-latest')
const pageId           = require('spike-page-id')
const locals                  = { }

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sml',
    css: '*(**/)*.sss',
    js: '**/*.js'
  },
  ignore: ['**/layout.sml', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards ({
    parser: sugarml,
    locals: (ctx) => { return Object.assign(locals,
      { pageId: pageId(ctx) },
    )},
    retext: { quotes: false }
  }),
  // postcss: cssStandards({
  //   parser: sugarss
  // }),
  postcss: cssStandards({
    parser: sugarss
  }),
  babel: jsStandards()
}
