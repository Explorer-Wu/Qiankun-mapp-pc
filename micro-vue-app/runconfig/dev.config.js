const Webpack = require('webpack')
const Config = require('webpack-chain')
const webpackConfig = new Config()
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const base = require('./base')
const loaders = require('./loaders')
const options = require('./config')
const files = require('./files')
const utils = require('./utils')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const {
  port = 8080,
  host = 'localhost',
  index = 'index.html',
  https = false,
  proxyTable = {},
  assetsPublicPath,
  autoOpenBrowser,
  // openPage = 'views'
  errorOverlay,
  poll,
  notifyOnErrors
} = options.dev

webpackConfig
  .mode('development')
  .plugin('errors')
    .use(FriendlyErrorsPlugin, [{
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${HOST}:${PORT}`],
      },
      onErrors: notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    }])
    .end()
  .plugin('hot')
    .use(Webpack.HotModuleReplacementPlugin);

base(webpackConfig)
files(webpackConfig)
loaders(webpackConfig)

// devServer
webpackConfig.devServer
  .port(PORT || port)
  .host(HOST || host) // host: HOST || host,
  // .proxy(proxyTable)
  .https(https)
  .open(autoOpenBrowser)
  // .openPage('views')
  .clientLogLevel('info')
  .historyApiFallback({
    // rewrites: [
    //   { from: /.*/g, to: path.posix.join(assetsPublicPath, '/index.html') },
    // ],
    disableDotRule: true
  })
  .disableHostCheck(true)
  .hot(true)
  .hotOnly(true)
  // .lazy(true)
  .inline(true) //关闭inline模式减少构建时间。
  .contentBase(false)  //使用您当前的工作目录来提供内容
  .progress(true)
  // .compress(true)  // gzip压缩
  .overlay(errorOverlay ? { warnings: true, errors: true } : false)
  .publicPath(assetsPublicPath)
  .quiet(false) // necessary for FriendlyErrorsPlugin
  .watchOptions({ poll: poll })
  .watchContentBase(false) // true,文件更改将触发整个页面重新加载
  // .liveReload(false)
  .headers({ "Access-Control-Allow-Origin": "*" })
  // .set('index', index)

module.exports = webpackConfig.toConfig()
