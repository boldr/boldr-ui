import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Twitter from '../../src/Social/Twitter';

test('<Twitter />', () => {
  const wrapper = shallow(<Twitter href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
