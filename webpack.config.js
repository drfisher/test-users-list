const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const isDevMode = NODE_ENV == 'dev';

module.exports = {
	entry: {
		app: './src/app/app.ts'
	},
	output: {
		path: path.resolve(__dirname, 'public/'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts', '.js', '.styl']
	},
	node: {
		global: false
	},

	// dev mode
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: isDevMode ? 'cheap-inline-module-source-map' : false,

	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader'],
			}),
		}, {
			test: /\.styl$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'stylus-loader'],
			}),
		}, {
			test: /\.pug$/,
			loader: 'pug-loader'
		}, {
			test: /\.ts$/,
			loader: 'ts-loader',
			include: [
				path.resolve(__dirname, 'src/app/')
			]
		}]
	},

	plugins: [
		new ExtractTextPlugin('[name].css')
	]
};
