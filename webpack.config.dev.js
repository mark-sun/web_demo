var common = require('./webpack.config.common');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: common.resolve,
  entry: [
    'webpack/hot/dev-server',
    './app/entrypoint'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
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
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  postcss: common.postcss
};
