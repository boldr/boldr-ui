// @flow weak
const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');

module.exports = {
  context: path.resolve(__dirname),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BOLDR_UI_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../docs'),
      'boldr-ui': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      },
    ],
  },
};
