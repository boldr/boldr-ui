import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LinkedIn from '../../src/Social/LinkedIn';

test('<LinkedIn />', () => {
  const wrapper = shallow(<LinkedIn href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});