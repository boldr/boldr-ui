// @flow weak
const path = require('path');
const webpack = require('webpack');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');
const libraryName = 'boldr-ui';

const baseConfig = {
  entry: {
    'boldr-ui': path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: './react',
        commonjs: ['./react'],
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: './react-dom',
        commonjs: ['./react-dom'],
        amd: 'react-dom',
      },
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [],
};

let config;

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      filename: `${libraryName}.min.js`,
    }),
    plugins: baseConfig.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new LodashWebpackPlugin(),
      new BabiliWebpackPlugin(),
    ]),
  });
} else {
  config = Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      filename: `${libraryName}.js`,
    }),
  });
}

module.exports = config;
