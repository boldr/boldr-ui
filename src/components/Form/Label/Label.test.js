import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { shallow } from 'enzyme';
import Label from './Label';

it('renders children when passed in', () => {
  const wrapper = shallow(<Label label="test" />);
  expect(wrapper.instance().props.label).toEqual('test');
});

test('renders snapshot', () => {
  const wrapper = shallow(<Label label="test" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
