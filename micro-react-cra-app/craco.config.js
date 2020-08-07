const CracoLessPlugin = require('craco-less');
const { name } = require('./package');
const path = require("path");
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      webpackConfig.output.globalObject = 'window';
      return webpackConfig;
    },
    alias: {
      public: pathResolve("./public"), //path.join(__dirname, '../public'),
      "@@views": pathResolve("./src/views"),
      "@@router": pathResolve("./src/router"),
      "@@components": pathResolve("./src/components"),
      // '@@containers': pathResolve('/src/reduxstore/containers'),
      // '@@actions': pathResolve('/src/reduxstore/actions'),
      // '@@reducers': pathResolve('/src/reduxstore/reducers'),
      // '@@store': pathResolve('/src/reduxstore/store'),
      "@@utils": pathResolve("./src/utils"),
      "@@assets": pathResolve("./src/assets"),
      "@@api": pathResolve("./src/api"),
      "@@": pathResolve("./src"),
    }
  }, 
  devServer: (config) => {
    config.port = 3603;
    config.headers = {
      'Access-Control-Allow-Origin': "*",
      // 'Access-Control-Allow-Methods': "*"
    },
    config.historyApiFallback = true;

    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};