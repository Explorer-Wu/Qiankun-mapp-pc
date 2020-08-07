const CracoLessPlugin = require('craco-less');

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
  // devServer: {
  //   port: 3006,
  //   headers: {
  //     'Access-Control-Allow-Origin': "*",
  //     'Access-Control-Allow-Methods': "*"
  //   },
  //   historyApiFallback: true,
  //   hot: false,
  //   watchContentBase: false,
  //   liveReload: false
  // },
};