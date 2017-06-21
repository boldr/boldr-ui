/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import Paper from '../../src/Paper';

test('<Paper /> merges className and style', () => {
  const props = {
    style: { background: 'black' },
    className: 'test',
  };

  const paper = TestUtils.renderIntoDocument(<Paper {...props} />);

  const paperNode = findDOMNode(paper);
  expect(paperNode.style.background).toBe(props.style.background);
  expect(paperNode.className).toContain(props.className);
});
