import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';

export const PopoverTriggerPropTypes = {
  children: PropTypes.node,

  onTriggerRefChange: PropTypes.func,

  getTriggerNode: PropTypes.func,
  getContentNode: PropTypes.func,

  contentVisible: PropTypes.bool,
  open: PropTypes.func,
  close: PropTypes.func,

  isOutsideStacked: PropTypes.func,
  injectIsOutsideSelf: PropTypes.func,
};

export default class PopoverTrigger extends Component {
  static propTypes = {
    ...PopoverTriggerPropTypes,
  };

  constructor(props) {
    super(props);

    props.injectIsOutsideSelf(this.isOutsideSelf);
  }

  // Note:
  // in the Trigger to determine a node outside Please use this.props.isOutsideStacked
  //
  // This function is here for compatibility with the old API,
  // because isOutside originally on the Trigger, in fact, on the Popover better.
  isOutsideSelf = target => {
    const { isOutside, getContentNode, getTriggerNode } = this.props;
    const box = getContentNode();
    const anchor = getTriggerNode();
    if (isOutside) {
      return isOutside(target, {
        contentNode: box,
        triggerNode: anchor,
      });
    }

    if (anchor && anchor.contains(target)) {
      return false;
    }

    if (box && box.contains(target)) {
      return false;
    }

    return true;
  };

  // Override this function to add custom event handlers
  getTriggerProps() {
    return {};
  }

  // helper to trigger event on child
  triggerEvent(element, eventName, event) {
    const handler = element.props[eventName];
    if (handler) {
      handler(event);
    }
  }

  validateChildren() {
    const { children } = this.props;
    const count = Children.count(children);

    if (count === 0) {
      throw new Error('Popover trigger requires a child');
    }

    const childrenType = typeof children;
    if ((count === 1 && childrenType === 'string') || childrenType === 'number') {
      return <span>{children}</span>;
    }

    if (count > 1) {
      throw new Error(`Popover trigger requires only one child, but found ${count}`);
    }

    const child = Children.only(this.props.children);
    if (child.ref) {
      throw new Error('ref is not allowed on Popover trigger');
    }

    return child;
  }

  render() {
    const child = this.validateChildren();

    return React.cloneElement(child, {
      ref: this.props.onTriggerRefChange,
      ...this.getTriggerProps(child),
    });
  }
}
