import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Form from '../../src/Form/Form';

const mockFn = jest.fn();

describe('<Form />', () => {
  const wrapper = shallow(<Form handleSubmit={mockFn} />);
  it('renders <Form /> without breaking', () => {
    expect(wrapper.find('.boldrui-form').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
