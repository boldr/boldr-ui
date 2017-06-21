/* eslint-env jest*/
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import FontIcon from '../../src/FontIcon';

describe('FontIcon', () => {
  it('applies a className and an iconClassName', () => {
    const icon = TestUtils.renderIntoDocument(
      <FontIcon className="test" iconClassName="fa fa-github" />,
    );
    const iconNode = ReactDOM.findDOMNode(icon);

    expect(iconNode.classList.contains('test')).toBe(true);
    expect(iconNode.classList.contains('fa')).toBe(true);
    expect(iconNode.classList.contains('fa-github')).toBe(true);
  });

  it('passes all remaining props to the font icon', () => {
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
      <FontIcon
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

    const dividerNode = ReactDOM.findDOMNode(divider);
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

  it('should set the width and height to 24 if the forceSize prop is enabled', () => {
    const icon = TestUtils.renderIntoDocument(<FontIcon forceSize />);
    const style = ReactDOM.findDOMNode(icon).style;
    const expected = '24px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
  });

  it('should only set the fontSize when forceFontSize is enabled', () => {
    let icon = TestUtils.renderIntoDocument(<FontIcon forceSize />);
    let style = ReactDOM.findDOMNode(icon).style;
    const expected = '24px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe('');

    icon = TestUtils.renderIntoDocument(<FontIcon forceSize forceFontSize />);
    style = ReactDOM.findDOMNode(icon).style;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe(expected);
  });

  it('should set the width and height to the provided forceSize value', () => {
    const icon = TestUtils.renderIntoDocument(<FontIcon forceSize={16} />);
    const style = ReactDOM.findDOMNode(icon).style;
    const expected = '16px';
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
  });

  it('should only set the fontSize to the provided forceSize value when forceFontSize is enabled', () => {
    const size = 16;
    let icon = TestUtils.renderIntoDocument(<FontIcon forceSize={size} />);
    let style = ReactDOM.findDOMNode(icon).style;
    const expected = `${size}px`;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe('');

    icon = TestUtils.renderIntoDocument(<FontIcon forceSize={size} forceFontSize />);
    style = ReactDOM.findDOMNode(icon).style;
    expect(style.height).toBe(expected);
    expect(style.width).toBe(expected);
    expect(style.fontSize).toBe(expected);
  });

  it('should prefer the style prop values over the forceSize styles', () => {
    const props = {
      style: { width: 16, height: 22, fontSize: 8 },
      forceSize: true,
      forceFontSize: true,
    };

    const icon = TestUtils.renderIntoDocument(<FontIcon {...props} />);
    const style = ReactDOM.findDOMNode(icon).style;
    expect(style.fontSize).toBe('8px');
    expect(style.height).toBe('22px');
    expect(style.width).toBe('16px');
  });
});
