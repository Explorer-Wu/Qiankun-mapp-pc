/** 开发模式以及生产模式共同的配置,入口&出口&HTML模板&需要复制的文件夹 **/
const Webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const CONFIG = require('./config')
const utils = require('./utils')

const outputDir = utils.resolve(CONFIG.base.outputDir)
const packageName = require('../package.json').name

module.exports = webpackConfig => {
  const isProd = webpackConfig.get('mode') === 'production'

  // analyer
  // webpackConfig.plugin('analyer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

  // base entry & output
  webpackConfig
    .context(utils.resolve("/"))
    .entry('app')
      .add(CONFIG.base.entryDir)
      .end()
    .output
      .path(outputDir)
      .filename('[name].[hash].js')
      .chunkFilename('[name].[chunkhash].js')
      .publicPath(process.env.NODE_ENV === "production" ? CONFIG.build.assetsPublicPath : CONFIG.dev.assetsPublicPath)
      // .libraryTarget('umd')
      // .umdNamedDefine(true)
      // .library(`${packageName}-[name]`)
      // .jsonpFunction(`webpackJsonp_${packageName}`)
      // .globalObject('window')

  const ManifestPlugin = require('webpack-manifest-plugin');
  webpackConfig
    .plugin('progress')
      .use(Webpack.ProgressPlugin)
      .end()
    .plugin('progress')
      .use(ManifestPlugin, [{
        fileName: "asset-manifest.json",
        // publicPath: '/',
        basePath: CONFIG.build.assetsRoot,
        publicPath:
          process.env.NODE_ENV === "production"
            ? CONFIG.build.assetsPublicPath
            : CONFIG.dev.assetsPublicPath,

        generate: (seed, files) => {
          const manifestFiles = files.reduce(function (manifest, file) {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
  
          return {
            files: manifestFiles,
          };
        },
      }])
  
  
  // resolve HTML files(s)
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const isGlobalConfig = CONFIG.base.globalConfig.open
  const globalConfigSource = CONFIG.base.globalConfig.source
  const targetDir = CONFIG.base.globalConfig.targetDir
  const localHtml = CONFIG.base.html ? CONFIG.base.html : false

  // const htmlOptions = []
  const htmlOption = {
    filename: "index.html",
    template: utils.resolve(localHtml),
    inject: true,
    title: CONFIG.base.title ? CONFIG.base.title : 'Webpack-vue-app',
    // meta: [
    //   {
    //     name: 'viewport',
    //     content:
    //       'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
    //   }
    // ],
    hash: true,
    cache: true,
    chunks: ['main', 'vendors'],
    // chunksSortMode: "dependency",
    favicon: utils.resolve('./public/favicon.ico'), 
    // appMountId: CONFIG.base.rootID ? CONFIG.base.rootID : 'app',
  }
  const isProdHtml = {
    minify: isProd
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
          // more CONFIG:
          // https://github.com/kangax/html-minifier#CONFIG-quick-reference
        }
      : {}
  }

  // if (localHtml) {
  //   htmlOption.template = path.join(__dirname, '../', localHtml)
  // } else {
  //   htmlOption.template = require('html-webpack-template')
  //   Object.assign(
  //     htmlOption,
  //     isGlobalConfig
  //       ? {headHtmlSnippet: getConfigScript(globalConfigSource, `${targetDir}/`)}
  //       : {}
  //   )
  // }

  // Object.assign(htmlOption, htmlMergeOptions, isProdHtml)
  // const htmlOption = {
  //   ...htmlMergeOptions, 
  //   ...isProdHtml
  // }
  console.log("utils:", utils.resolve(CONFIG.base.outputDir), htmlOption)

  webpackConfig.plugin('html').use(HtmlWebpackPlugin, [htmlOption])

  /**
   * 获取script标签字符串
   * @param  {String} source    [源目标目录]
   * @param  {[String]} targetDir [生成的文件夹]
   * @return {[String]}           [指定文件夹下的文件的标签]
   */
  function getConfigScript(source, targetDir) {
    if (!isGlobalConfig) {
      return undefined
    }

    if (!targetDir.endsWith('/')) {
      targetDir = targetDir + '/'
    }

    if (targetDir === '/') {
      targetDir = './'
    }

    let configFiles = fs.readdirSync(path.resolve(__dirname, source), {})

    let jsFiles = configFiles.filter(file => {
      return file.endsWith('.js') !== -1
    })
    let cssFiles = configFiles.filter(file => {
      return file.endsWith('.css')
    })

    let scripts = jsFiles.map(file => {
      return `<script src='${targetDir + file}'></script>`
    })
    let links = cssFiles.map(link => {
      return `<link rel='stylesheet' href='${targetDir + link}' />`
    })

    return links.concat(scripts).join('\n')
  }

  // copy assets file(s)
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  const copyAssetsOptions = {
    patterns: [
      { 
        from: utils.resolve(globalConfigSource),  //utils.resolve('./public/static'),
        // toType: 'dir',
        to: targetDir,
        // ignore: ['*.md']
      },
    ],
    options: {
      concurrency: 100
    }
  } 
  webpackConfig.plugin('copy').use(CopyWebpackPlugin, [
    copyAssetsOptions
  ])

  // if (isGlobalConfig) {
  //   webpackConfig.plugin('copy-lib').use(CopyWebpackPlugin, [
  //     {
  //       patterns:[
  //         {
  //           from: utils.resolve(globalConfigSource),
  //           // toType: 'dir',
  //           to: targetDir
  //         }
  //       ]
  //     }
  //   ])

  //   const isExternals = CONFIG.base.globalConfig.externals

  //   if (isExternals) {
  //     webpackConfig.externals(isExternals)
  //   }
  // }

  // extensions
  CONFIG.base.extensions.map(item => {
    webpackConfig.resolve.extensions.add(item)
  })

  // alias
  for (let key in CONFIG.base.alias) {
    let path = key.includes('/') ? CONFIG.base.alias[key] + '/' : CONFIG.base.alias[key]
    webpackConfig.resolve.alias.set(key, path)
  }
}
