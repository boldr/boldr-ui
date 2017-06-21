import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import Facebook from '../../src/Social/Facebook';

test('<Facebook />', () => {
  const wrapper = shallow(<Facebook href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
