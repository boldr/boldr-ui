import React from 'react';
import shallow from 'react-test-renderer/shallow';
import StatLabel from '../StatLabel';

const mockName = 'abc';

it('<StatLabel />, renders the widget with props', () => {
  const wrapper = shallow(<StatLabel name="abc" />);
  expect(wrapper.instance().props.name).toEqual(mockName);
});
