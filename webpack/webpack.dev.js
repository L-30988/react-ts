const { merge } = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const proxySetting = require('../src/setProxy.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    open: true,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  proxy: { ...proxySetting }
})
