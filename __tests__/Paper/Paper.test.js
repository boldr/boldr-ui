/* eslint-env jest */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import Paper from '../../src/Paper';

test('<Paper /> matches the snapshot', () => {
  const wrapper = shallow(<Paper zDepth={3} />);

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
