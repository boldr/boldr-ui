import React from 'react';
import { shallow } from 'enzyme';
import ContentPromo from '../../src/ContentPromo';

describe('<ContentPromo />', () => {
  let requiredProps = {};

  beforeEach(() => {
    requiredProps = {};
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(
      <ContentPromo {...requiredProps} className="test">
        <h1>hello</h1>
      </ContentPromo>,
    );

    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render the passed children.', () => {
    const wrapper = shallow(<ContentPromo {...requiredProps}>Foo bar</ContentPromo>);

    expect(wrapper.html()).toContain('Foo bar');
  });
});
