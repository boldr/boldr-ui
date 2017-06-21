import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Google from '../../src/Social/Google';

test('<Google />', () => {
  const wrapper = shallow(<Google href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});