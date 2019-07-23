const webpack = require('webpack')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MockMiddleware = require('./mock-middleware')

const { root, rootTo, dist, distTo } = require('./util.js')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    contentBase: dist,
    hot: true,
    quiet: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    open: false,
    overlay: {
      errors: true,
    },
    proxy: {
      // "/api": {
      //   target: "http://localhost:8080",  // 本地服务器
      //   pathRewrite: {
      //     // "^/api": "",
      //   },
      //   changeOrigin: true,
      // },
    },
    after(app) {
      app.use(MockMiddleware)
    }
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
})

module.exports = portfinder.getPortPromise({
  port: devWebpackConfig.devServer.port
}).then(port => {
  const message = `Look at: http://${devWebpackConfig.devServer.host}:${port}\n`
  devWebpackConfig.devServer.port = port

  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [message]
    },
    onErrors() {
      console.log(message);
    }
  }))
  return devWebpackConfig
})
