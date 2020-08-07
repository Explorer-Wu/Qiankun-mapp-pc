const CONFIG = require('./config')
const utils = require('./utils')

module.exports = webpackConfig => {
  const isProd = webpackConfig.get('mode') === 'production'

  // CSS & Less Rule
  function createCSSRule(lang, test, loader) {
    const baseRule = webpackConfig.module.rule(lang).test(test)

    baseRule
      // .use('extract-css-loader')
      //   .loader(require('mini-css-extract-plugin').loader)
      //   .options({
      //     publicPath: '/' //分离后CSS文件的打包位置
      //   })
        // .end()
      .use('style-loader')
        .loader('style-loader')
        .end()
      .use('css-loader')
        .loader('css-loader')

    baseRule
      .use('postcss')
        .loader('postcss-loader')
        // .options({
        //   plugins: [require('autoprefixer')()]
        // })

    if (loader === 'less-loader') {
      const LessPluginFunctions = require('less-plugin-functions')
      const lessFuncOptions = CONFIG.less.lessFunction
        ? {
            plugins: [new LessPluginFunctions()]
          }
        : {}

      baseRule
        .use(loader)
        .loader(loader)
        .options(lessFuncOptions)

      const lessCommonOption = CONFIG.less.lessCommon

      if (lessCommonOption) {
        baseRule
          .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({ patterns: lessCommonOption })
      }
    }

    if (loader === 'sass-loader') {
      baseRule
        .oneOf('vue')
          .resourceQuery(/\?vue/)
          .use('vue-style')
            .loader('vue-style-loader')
            .end()
          .end()
        .oneOf('normal')
          .use('sass')
            .loader('sass-loader')
            .end()
          .end()
        .oneOf('sass-vars')
          .after('vue')
          .resourceQuery(/\?sassvars/)
          .use('sass-vars')
            .loader('sass-vars-to-js-loader')
    }
  }

  createCSSRule('css', /\.css$/)
  // createCSSRule('less', /\.less$/, 'less-loader')
  createCSSRule('scss', /\.s[ac]ss$/i, 'sass-loader')

  // inject CSS extraction plugin
  webpackConfig
    .plugin('extract-css')
    .use(require('mini-css-extract-plugin'), [{ filename: utils.assetsPath('css/[name].css') }])

  if (isProd) {
    // minify extracted CSS
    const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    // const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')

    webpackConfig.plugin('minify-css').use(OptimizeCSSAssetsPlugin, [
      {
        assetNameRegExp: /\.less\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }
    ])
    webpackConfig.optimization.minimizer('css').use(OptimizeCSSAssetsPlugin)

    //minify-uglify-js
    webpackConfig.optimization.minimizer('js').use(TerserPlugin, [
      {
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        }
      }
    ])
  }

  // vue & tsx & jsx Rule
  function createJSRule(lang, test, loader, options = {}, exclude = [], enforce) {
    const baseRule = webpackConfig.module.rule(lang).test(test)

    baseRule
      .use(loader)
      .loader(loader)
      .options(options)

    if (enforce) {
      baseRule.enforce(enforce)
    }
  }

  const babelOptions = { presets: ['@babel/preset-env'] }

  if (CONFIG.base.lazyLoading) {
    babelOptions['plugins'] = ['@babel/plugin-syntax-dynamic-import']
  }

  createJSRule('vue', /\.vue$/, 'vue-loader')

  webpackConfig.plugin('vue').use(require('vue-loader/lib/plugin'))


  // ts
  // const isUseTS = CONFIG.typescript.open
  // let tsOptions = {
  //   appendTsSuffixTo: [/\.vue$/],
  //   reportFiles: ['src/**/*.{ts,tsx}']
  // }

  // if (isUseTS) {
  //   if (isUseVue) {
  //     createJSRule('vts', /\.tsx?$/, 'ts-loader', tsOptions)
  //   }
  //   if (isUseReact) {
  //     createJSRule('tsx', /\.tsx?$/, 'awesome-typescript-loader', {
  //       reportFiles: ['src/**/*.{ts,tsx}']
  //     })
  //   }
  //   if (!isUseVue && !isUseReact) {
  //     createJSRule('ts', /\.ts$/, 'ts-loader')
  //   }
  // }

  // if (isUseReact && isUseTS) {
  //   createJSRule('js', /\.js$/, 'source-map-loader', {}, [], 'pre')
  // }

  createJSRule('js', /\.jsx?$/, 'babel-loader', babelOptions)

  // split lib 分割框架
  const libs = CONFIG.libs

  if (libs) {
    webpackConfig.optimization
      .splitChunks({
        chunks: 'all',
        // automaticNameDelimiter: '-',
        // cacheGroups: {
        //   // lib: {
        //   //   test: /[\\/]node_modules[\\/]/,
        //   //   priority: -10
        //   // },
        //   vendors: {
        //     name: "vendor",
        //     chunks: "initial",
        //     priority: -10,
        //     reuseExistingChunk: false,
        //     test: /[\\/]node_modules[\\/]/,
        //   },
        //   default: {
        //     // 模块缓存规则，设置为false，默认缓存组将禁用
        //     minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
        //     priority: -20, // 优先级， 该配置项是设置处理的优先级，数值越大越优先处理
        //     reuseExistingChunk: true, // 是否复用存在的chunk，默认使用已有的模块，
        //   },
        //   manifest: {
        //     name: "manifest",
        //     chunks: "initial",
        //   },
        // }
      })
      .runtimeChunk({
        name: 'runtime'
      })
  }
}
