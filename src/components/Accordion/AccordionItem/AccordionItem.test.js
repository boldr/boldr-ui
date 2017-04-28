import React from 'react';
import renderer from 'react-test-renderer';

import AccordionItemTitle from '../AccordionItemTitle/AccordionItemTitle';
import AccordionItemBody from '../AccordionItemBody/AccordionItemBody';
import AccordionItem from './AccordionItem';

jest.mock('uuid', () => {
  return {
    v4: () => 'mock-uuid-hash',
  };
});

jest.mock('../AccordionItemTitle/AccordionItemTitle', () => {
  const RealReact = require.requireActual('react');
  class MockElement extends RealReact.Component {
    render() {
      return RealReact.createElement('div', this.props, this.props.children);
    }
  }
  MockElement.accordionElementName = 'AccordionItemTitle';

  return MockElement;
});

jest.mock('../AccordionItemBody/AccordionItemBody', () => {
  const RealReact = require.requireActual('react');
  class MockElement extends RealReact.Component {
    render() {
      return RealReact.createElement('div', this.props, this.props.children);
    }
  }
  MockElement.accordionElementName = 'AccordionItemBody';

  return MockElement;
});

describe('AccordionItem', () => {
  it('renders correctly with accordion true', () => {
    const tree = renderer
      .create(
        <AccordionItem>
          <AccordionItemTitle>
            <div>Fake title</div>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div>Fake body</div>
          </AccordionItemBody>
        </AccordionItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with accordion false', () => {
    const tree = renderer
      .create(
        <AccordionItem accordion={false}>
          <AccordionItemTitle>
            <div>Fake title</div>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div>Fake body</div>
          </AccordionItemBody>
        </AccordionItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('still renders with incorrect type children', () => {
    const tree = renderer
      .create(
        <AccordionItem accordion={false}>
          <div>Fake title</div>
          <div>Fake body</div>
        </AccordionItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with different className', () => {
    const tree = renderer
      .create(
        <AccordionItem className="testCSSClass">
          <AccordionItemTitle>
            <div>Fake title</div>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div>Fake body</div>
          </AccordionItemBody>
        </AccordionItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
