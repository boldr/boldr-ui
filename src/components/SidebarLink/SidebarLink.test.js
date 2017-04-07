import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SidebarLink from './SidebarLink';

describe('<SidebarLink />', () => {
  const wrapper = shallow(<SidebarLink text="widget" href="/asf" icon="cat" />);
  it('renders <SidebarLink /> without breaking', () => {
    expect(wrapper.find('li').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
