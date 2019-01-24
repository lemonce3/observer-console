const path = require('path');
const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
	mode: 'development',
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			]
		},
		{
			test: /\.less$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'less-loader'
			]
		},
		]
	},
	devServer: {
		proxy: {
			// '/api': 'http://192.168.31.234:8090',
			'/api': 'http://localhost:8080'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './template/index.html')
		})
	]
});