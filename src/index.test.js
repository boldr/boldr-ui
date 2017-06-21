// @flow weak
/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import * as BoldrUI from './index';

describe('BoldrUI', () => {
  it('should have exports', () => assert.ok(BoldrUI));

  it('should not do undefined exports', () => {
    Object.keys(BoldrUI).forEach(exportKey => assert.ok(BoldrUI[exportKey]));
  });
});
