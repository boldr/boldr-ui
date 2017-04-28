import React from 'react';
import { shallow } from 'enzyme';
import Headline from './../headline/';
import Paragraph from './../paragraph/';
import Card from './index';

describe('(React Component) Card', () => {
  let requiredProps = {};

  beforeEach(() => {
    requiredProps = {
      to: '/my/page/',
      title: 'My awesome page',
      text: 'This Card teases a different page with an image, a headline and a short descrition.',
      asset: props => <img src="http://placehold.it/350x150" {...props} />,
    };
  });

  it('should render the image.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const image = wrapper.find('img');

    expect(image).to.have.length(1);
    expect(image.html()).to.contain('http://placehold.it/350x150');
  });

  it('should render the title.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const headline = wrapper.find(Headline);

    expect(headline).to.have.length(1);
    expect(headline.html()).to.contain('My awesome page');
  });

  it('should respect the "headlineType" prop when rendering the title.', () => {
    const wrapper = shallow(<Card {...requiredProps} headlineType="h5" />);
    const headline = wrapper.find(Headline);

    expect(headline.prop('type')).to.equal('h5');
  });

  it('should render the text.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const paragraph = wrapper.find(Paragraph);

    expect(paragraph).to.have.length(1);
    expect(paragraph.html()).to.contain(
      'This Card teases a different page with an image, a headline and a short descrition.',
    );
  });

  it('should allow custom contents to be rendered as its children.', () => {
    const wrapper = shallow(<Card {...requiredProps}>Foo bar baz</Card>);

    expect(wrapper.html()).to.contain('Foo bar baz');
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = shallow(<Card {...requiredProps} onClick={handler} />);

    wrapper.simulate('click');

    expect(handler.calledOnce).to.equal(true);
  });

  it('should render the actions if passed.', () => {
    const actions = <button>Foo</button>;
    const wrapper = shallow(<Card {...requiredProps} actions={actions} />);

    expect(wrapper.find('button')).to.have.length(1);
  });
});
