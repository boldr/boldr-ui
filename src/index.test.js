// @flow weak
/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import * as BoldrUI from './index';

describe('BoldrUI', () => {
  it('should have exports', () => expect(BoldrUI).toBeDefined());
});
