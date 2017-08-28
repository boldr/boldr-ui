import React from 'react';
import sinon from 'sinon';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import Heading from './Heading';

describe('<Heading />', () => {
  it('should render the passed children.', () => {
    const wrapper = shallow(<Heading.H1>My Contents</Heading.H1>);

    expect(wrapper.html()).toContain('My Contents');
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Heading.H1 className="test">My Contents</Heading.H1>);
    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render a styled span if no type was specified.', () => {
    const wrapper = shallow(<Heading>My Contents</Heading>);

    expect(wrapper.type()).toEqual('span');
  });

  it('should render an h1.', () => {
    const wrapper = shallow(<Heading.H1>My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h2 with an h1 size.', () => {
    const wrapper = shallow(<Heading.H2 size="h1">My Contents</Heading.H2>);

    expect(wrapper.type()).toEqual('h2');
  });
  it('should render an h1 with an h6 size.', () => {
    const wrapper = shallow(<Heading.H1 size="h6">My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h1 with an h5 size.', () => {
    const wrapper = shallow(<Heading.H1 size="h5">My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h1 with an h4 size.', () => {
    const wrapper = shallow(<Heading.H1 size="h4">My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h1 with an h3 size.', () => {
    const wrapper = shallow(<Heading.H1 size="h3">My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h1 with an h2 size.', () => {
    const wrapper = shallow(<Heading.H1 size="h2">My Contents</Heading.H1>);

    expect(wrapper.type()).toEqual('h1');
  });
  it('should render an h2.', () => {
    const wrapper = shallow(<Heading.H2>My Contents</Heading.H2>);

    expect(wrapper.type()).toEqual('h2');
  });
  it('should render an h3.', () => {
    const wrapper = shallow(<Heading.H3>My Contents</Heading.H3>);

    expect(wrapper.type()).toEqual('h3');
  });
  it('should render an h4.', () => {
    const wrapper = shallow(<Heading.H4>My Contents</Heading.H4>);

    expect(wrapper.type()).toEqual('h4');
  });
  it('should render an h5.', () => {
    const wrapper = shallow(<Heading.H5>My Contents</Heading.H5>);

    expect(wrapper.type()).toEqual('h5');
  });
  it('should render an h6.', () => {
    const wrapper = shallow(<Heading.H6>My Contents</Heading.H6>);

    expect(wrapper.type()).toEqual('h6');
  });
  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(<Heading.H1 onClick={handler}>My Contents</Heading.H1>);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
