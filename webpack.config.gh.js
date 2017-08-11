var common = require('./webpack.config.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  resolve: common.resolve,
  entry: './app/entrypoint',
  output: {
    filename: 'bundle.[hash].js',
    path: 'build',
    publicPath: './build'
  },
  module: {
    preLoaders: [common.jsonLoader],
    loaders: [
      common.jsLoader,
      common.cssLoader,
      common.svgLoader,
      common.fileLoader,
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('gh'),
    }),
    new HtmlWebpackPlugin({
      template: './deploy/index.html',
      inject: true,
    }),
  ],
  postcss: common.postcss
};
