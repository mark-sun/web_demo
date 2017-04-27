var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '']
  },
  jsonLoader: {
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json'
  },
  jsLoader: {
    test: /\.(js|jsx)$/,
    include: [
      path.join(__dirname, 'app')
    ],
    loaders: ['babel']
  },
  cssLoader: {
    test: /\.scss$/,
    include: [
      path.join(__dirname, 'app')
    ],
    loaders: [
      'style',
      'css',
      'postcss',
      'sass'
    ]
  },
  fileLoader: {
    test: /\.(jpg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[hash].[ext]',
    },
  },
  urlLoader: {
    test: /\.(jpg|png|svg)$/,
    loader: 'url-loader',
    options: {
      limit: 25000,
    },
  },
  postcss: [autoprefixer]
};
