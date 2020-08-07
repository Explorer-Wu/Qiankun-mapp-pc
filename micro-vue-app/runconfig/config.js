const path = require('path')
// const userConfig = require('./glabal.config')

function _join(filepath) {
  if (typeof filepath === 'string') {
    return path.join(__dirname, '../', filepath)
  }
  if (typeof filepath === 'object') {
    for (const key in filepath) {
      if (filepath.hasOwnProperty(key)) {
        filepath[key] = path.join(__dirname, '../', filepath[key])
      }
    }

    return filepath
  }
}

function multipagesPath(options) {
  let obj = Object.assign({}, options)

  for (let entry in obj) {
    for (let key in obj[entry]) {
      if (key === 'entry' || key === 'html') {
        obj[entry][key] = _join(obj[entry][key])
      }
    }
  }
  return obj
}

function aliasValue(alias) {
  for (let key in alias) {
    alias[key] = _join(alias[key])
  }
  return alias
}

module.exports = {
  base: {
    // 单页面入口文件
    entryDir: '../src/main.js',
    // 发布路径
    outputDir: './dist',

    // 默认生成html里div节点ID
    // 默认不设置值为app
    rootID: 'app',

    title: 'micro-vue-app',

    // html文件模板路径
    html: '/public/index.html',

    // 全局不打包文件目录,需配置默认html模板使用
    // 自定义html模板时,如果使用全局不打包的js需要手动插入
    globalConfig: {
      open: true,
      source: '/public/static',
      targetDir: 'static',
      // 省略后缀
      extensions: ['.js', '.vue', '.json', '.jsx', '.less', '.scss', '.css']
    },

    // // devServer配置
    // server: {
    //   port: '3605',
    //   host: 'localhost'
    // },

    extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'],
    // alias
    alias: {
      '@': _join('src')
    },

    // 懒加载
    lazyLoading: true
  },
  dev: {
    env: require("./dev.env"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/", //   `//localhost:3603/`,
    proxyTable: {
      "/api/": {
        target: "http://172.0.0.1:3681",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
        // onProxyReq: function(proxyReq, req, res) {
        //   // add custom header to request
        //   proxyReq.setHeader('Cookie', 'username=wuwh; sessionid=xxxxx');
        //   // or log the req
        // }
      },
    },
    host: "localhost", // '0.0.0.0', // can be overwritten by process.env.HOST
    port: 3605, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: {
      app: ["Google Chrome", "--incognito", "--other-flag"] //隐身窗口
    }, //true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map", //在大多数情况下，最佳选择
    // cacheBusting: true, //vue-loader cachebusting
    cssSourceMap: false,  //true
  },
  build: {
    env: require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map', // 'cheap-module-source-map' 'cheap-source-map' 转换过的代码（仅限行）
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'less', 'sass'],
    bundleAnalyzerReport: true  //process.env.npm_config_report
  },

  // less设置
  less: {
    // 是否引入less-plugin-functions
    lessFunction: true,
    // common less file 公共less文件,不用引入即可使用
    // 不需要时设置为false
    lessCommon: false
  },

  // vue options
  vue: {
    // 是否使用vue
    open: true,
    // 是否在vue中使用typescript
    withTS: false,
    // vue中使用的框架,打包时会分割出来
    // 优先级按先后顺序
    libs: ['vue', 'vue-property-decorator']
  },

  // 项目中使用的框架,打包时会分割出来
  // 优先级按先后顺序
  libs: true,

  eslint: false
}
