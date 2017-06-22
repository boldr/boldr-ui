import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NavAnchor from '../../src/NavAnchor';

describe('<NavAnchor />', () => {
  const wrapper = shallow(<NavAnchor href="/" title="Home" onClick={() => {}} />);
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
