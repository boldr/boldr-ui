/* @flow */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: 'commonjs',
      },
    ],
    'react',
  ],
  plugins: [
    'transform-flow-strip-types',
    'transform-class-properties',
    'transform-object-rest-spread',
  ],
});
