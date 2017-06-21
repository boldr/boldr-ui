/* @flow */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['es2015', 'stage-1', 'react'],
  plugins: ['transform-flow-strip-types', 'transform-class-properties'],
});
