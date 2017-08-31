import React, { Component } from 'react';
import cN from 'classnames';
import throttle from 'lodash.throttle';

import PropTypes from 'prop-types';
import WindowResizeHandler from '../util/component/WindowResizeHandler';
import findPositionedParent from '../util/dom/findPositionedParent';

import Portal from '../Portal';
import invisiblePlacement from './placement/invisible';

function translateToContainerCoordinates(containerBB, bb) {
  const { left, top } = containerBB;
  return {
    width: bb.width,
    height: bb.height,
    top: bb.top - top,
    left: bb.left - left,
    bottom: bb.bottom - top,
    right: bb.right - left,
  };
}

/**
 * Like triggers, content can be replaced with your own implementation, all you have to do is extend this base class.
 *
 * The props on this class are all private.
 */
export default class PopoverContent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,

    getContentNode: PropTypes.func,

    visible: PropTypes.bool,

    // placement strategy
    placement: PropTypes.func,

    cushion: PropTypes.number,

    // A function that returns the anchor for this popover
    // () => Node
    getAnchor: PropTypes.func,

    // defaults to body
    containerSelector: PropTypes.string,
  };

  state = {
    position: null,
  };
  componentDidMount() {
    const { visible } = this.props;

    if (visible) {
      this.adjustPosition();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && nextProps.visible !== this.props.visible) {
      this.adjustPosition();
    }
  }
  getAnchor() {
    return this.props.getAnchor();
  }

  getPositionedParent() {
    // findPositionedParent returns null on fail
    if (this.positionedParent !== undefined) {
      return this.positionedParent;
    }

    const { containerSelector } = this.props;
    const container = document.querySelector(containerSelector);
    const parent = findPositionedParent(container, true);
    this.positionedParent = parent;
    return parent;
  }

  adjustPosition = () => {
    const content = this.props.getContentNode();

    if (!content) {
      this.setState({
        position: invisiblePlacement('boldrui'),
      });
      setTimeout(this.adjustPosition, 0);

      return;
    }

    const anchor = this.getAnchor();
    const boundingBox = anchor.getBoundingClientRect();

    const parent = this.getPositionedParent();
    const parentBoundingBox = parent.getBoundingClientRect();

    const contentBoundingBox = content.getBoundingClientRect();

    const relativeBB = translateToContainerCoordinates(parentBoundingBox, boundingBox);
    const relativeContainerBB = translateToContainerCoordinates(
      parentBoundingBox,
      parentBoundingBox,
    );
    const position = this.props.placement(
      'boldrui',
      relativeBB,
      relativeContainerBB,
      {
        width: contentBoundingBox.width,
        height: contentBoundingBox.height,
      },
      {
        cushion: this.props.cushion,
        anchor,
        container: parent,
        anchorBoundingBoxViewport: boundingBox,
        containerBoundingBoxViewport: parentBoundingBox,
      },
    );

    this.setState({
      position,
    });
  };

  onWindowResize = throttle((evt, delta) => {
    if (this.props.visible && (delta.deltaX !== 0 || delta.deltaY !== 0)) {
      this.adjustPosition();
    }
  }, 16);

  render() {
    const { className, id, visible, children, containerSelector } = this.props;
    const { position } = this.state;

    if (!position) {
      return null;
    }

    const cls = cN('boldr-popover', className, id, position.toString());

    return (
      <Portal
        prefix="boldrui"
        visible={visible}
        selector={containerSelector}
        className={cls}
        css={position.getCSSStyle()}
      >
        <div className="boldr-popover-content">
          {children}
          <WindowResizeHandler onResize={this.onWindowResize} />
        </div>
      </Portal>
    );
  }
}
