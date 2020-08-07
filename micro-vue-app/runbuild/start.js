// "start": "webpack-dev-server --open --config scripts/dev.js",
// "dev": "webpack-dev-server --open --config scripts/dev.js --colors --progress --hide-modules",
// require('./check-versions')()

const path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('../runconfig/utils')
const config = require('../runconfig/config')

// console.log("process.env:", process.env);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const HOST = process.env.HOST || config.dev.host;
const PORT = Number(process.env.PORT) || config.dev.port

const ora = require('ora')
const devWebpackConfig = require('../runconfig/dev.config');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// console.log("devWebpackConfig:", devWebpackConfig);
// Add FriendlyErrorsPlugin
// devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//   compilationSuccessInfo: {
//     messages: [`Your application is running here: http://${HOST}:${PORT}`],
//   },
//   onErrors: config.dev.notifyOnErrors
//     ? utils.createNotifierCallback()
//     : undefined
// }))

const compiler = Webpack(devWebpackConfig);

const devServerConfig = {
  ...devWebpackConfig.devServer,
  progress: true,
  stats: {
    env: true,
    errors: true,
    // timings: true,
    // version: true,
    // warnings: true,
    colors: true,
    // entrypoints: false,
    // children: false,
  }, 
};

const devServer = new WebpackDevServer(compiler, devServerConfig);
// const portfinder = require('portfinder')

const spinner = ora('starting for development...')
spinner.start()
// Launch WebpackDevServer.
devServer.listen(PORT, HOST, err => {
    if (err) throw err

    console.log("devWebpackConfig:", devWebpackConfig);
    console.log(`Starting server on http://${HOST}:${PORT}`);
    spinner.stop()
});

// ['SIGINT', 'SIGTERM'].forEach(function(sig) {
//   process.on(sig, function() {
//     devServer.close();
//     process.exit();
//   });
// });