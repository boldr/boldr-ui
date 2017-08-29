import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import View from './View';

describe('<View />', () => {
  const wrapper = shallow(<View />);
  it('renders <View /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should render CSS rules', () => {
    const tree = renderer.create(<View />).toJSON();
    expect(tree).toHaveStyleRule('width', '100%');
  });

  it('renders snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
