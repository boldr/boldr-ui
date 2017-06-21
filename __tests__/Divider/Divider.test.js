/* eslint-env jest*/
import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import Divider from '../../src/Divider';

describe('Divider', () => {
  it('updates the className with inset or vertical', () => {
    let divider = TestUtils.renderIntoDocument(<Divider />);

    let dividerNode = findDOMNode(divider);

    expect(dividerNode.className).toBe('boldrui-divider');

    divider = TestUtils.renderIntoDocument(<Divider inset />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.className).toContain('__inset');
    expect(dividerNode.className).not.toContain('__vertical');

    divider = TestUtils.renderIntoDocument(<Divider inset vertical />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.className).toContain('__inset');
    expect(dividerNode.className).toContain('__vertical');

    divider = TestUtils.renderIntoDocument(<Divider vertical />);
    dividerNode = findDOMNode(divider);

    expect(dividerNode.className).not.toContain('__inset');
    expect(dividerNode.className).toContain('__vertical');
  });

  it('passes all remaining props to the divider', () => {
    // eslint-disable-line
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const style = { display: 'block' };

    const divider = TestUtils.renderIntoDocument(
      <Divider
        style={style}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      />,
    );

    const dividerNode = findDOMNode(divider);
    expect(dividerNode.style.display).toBe(style.display);

    TestUtils.Simulate.click(dividerNode);
    expect(onClick).toBeCalled();

    TestUtils.Simulate.focus(dividerNode);
    expect(onFocus).toBeCalled();

    TestUtils.Simulate.blur(dividerNode);
    expect(onBlur).toBeCalled();

    TestUtils.Simulate.mouseOver(dividerNode);
    expect(onMouseOver).toBeCalled();

    TestUtils.Simulate.mouseLeave(dividerNode);
    expect(onMouseLeave).toBeCalled();

    TestUtils.Simulate.mouseDown(dividerNode);
    expect(onMouseDown).toBeCalled();

    TestUtils.Simulate.mouseUp(dividerNode);
    expect(onMouseUp).toBeCalled();

    TestUtils.Simulate.touchStart(dividerNode);
    expect(onTouchStart).toBeCalled();

    TestUtils.Simulate.touchEnd(dividerNode);
    expect(onTouchEnd).toBeCalled();

    TestUtils.Simulate.touchCancel(dividerNode);
    expect(onTouchCancel).toBeCalled();
  });
});
