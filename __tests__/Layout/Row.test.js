import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Row from '../../src/Layout/Row';

test('<Row />, should have a class reflective of size props', () => {
  const wrapper = mount(<Row />);
  const wrapperInner = wrapper.find('.grid__row');
  expect(wrapperInner.is('.grid__row')).toBe(true);
});
