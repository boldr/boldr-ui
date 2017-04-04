/* @flow */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['stage-2', 'es2015', 'react'],
  plugins: [
    'transform-decorators-legacy',
  ],
});
