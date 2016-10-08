const path             = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards    = require('reshape-standard')
const postcss          = require('postcss')
const cssStandards     = require('spike-css-standards')
const jsStandards      = require('babel-preset-latest')
const pageId           = require('spike-page-id')
const mixins           = require('postcss-mixins')
const vars             = require('postcss-simple-vars')
const nesting          = require('postcss-nesting')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss',
    js: '**/*.js'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' }
    })
  },

  postcss: (ctx) =>  {
    return cssStandards({
      webpack: ctx,
      plugins: [mixins,vars,nesting]
    })
  },
  babel: { presets: [jsStandards] },
  plugins: [
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
