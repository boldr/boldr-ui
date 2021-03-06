import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { LevelRight } from '../LevelRight';

describe('<LevelRight />', () => {
  it('should render a div with .boldrui-level__right', () => {
    const component = shallow(<LevelRight>My LevelRight</LevelRight>);
    expect(component.contains(<div className="boldrui-level__right">My LevelRight</div>)).toBe(
      true,
    );
  });

  it('should render a p with .boldrui-level__right', () => {
    const component = shallow(<LevelRight tag="p">My LevelRight</LevelRight>);
    expect(component.contains(<p className="boldrui-level__right">My LevelRight</p>)).toBe(true);
  });

  it('should render a div with .boldrui-level__right and custom classNames', () => {
    const component = shallow(
      <LevelRight className="custom">
        <span>Any Content</span>
      </LevelRight>,
    );
    expect(component.hasClass('boldrui-level__right')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<LevelRight>My LevelRight</LevelRight>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
