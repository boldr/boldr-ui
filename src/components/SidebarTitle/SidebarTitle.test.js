import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SidebarTitle from './SidebarTitle';

describe('<SidebarTitle />', () => {
  const wrapper = shallow(<SidebarTitle text="widget" />);
  it('renders <SidebarTitle /> without breaking', () => {
    expect(wrapper.find('li').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
