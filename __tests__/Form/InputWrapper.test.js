import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InputWrapper from '../../src/Form/InputWrapper';

const mockFn = jest.fn();
const mockProps = {
  ui: { a: '' },
  label: 'abc',
};

test('<InputWrapper /> renders snapshot', () => {
  const wrapper = shallow(<InputWrapper {...mockProps} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
