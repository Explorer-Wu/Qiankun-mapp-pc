const Config = require('webpack-chain');
const webpackConfig = new Config();
const base = require('./base');
const loaders = require('./loaders');
const files = require('./files');
// clean
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

webpackConfig
	.mode('production')
	.plugin('clean').use(CleanWebpackPlugin)
	
base(webpackConfig)
files(webpackConfig)
loaders(webpackConfig)

module.exports = webpackConfig.toConfig();