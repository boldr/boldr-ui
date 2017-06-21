import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Social from '../../src/Social/Social';

test('<Social />', () => {
  const wrapper = shallow(<Social facebook twitter google github linkedin />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
