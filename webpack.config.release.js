var common = require('./webpack.config.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '', '.svg']
  },
  entry: './app/entrypoint',
  output: {
    filename: 'bundle.[hash].js',
    path: 'build',
    publicPath: './build/'
  },
  module: {
    preLoaders: [common.jsonLoader],
    loaders: [
      common.jsLoader,
      common.cssLoader,
      common.urlLoader,
      common.fileLoader,
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: './deploy/index.html',
      inject: true,
    }),
  ],
  postcss: common.postcss
};
