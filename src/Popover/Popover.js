/**
 * Design:
 *
 * Popover component is just a shell, responsible for assembling Trigger and Content.
 *
 * The actual opening / closing of the shell is done by Content, and what happens is the Trigger control.
 *
 * Popover component is a recursive component that supports nesting.
 *
 *
 *            context                       context
 * ------> ------>
 * Popover               Popover child                    Popover grand-child     ......
 *            <------                       <------
 * IsOutsideStacked isOutsideStacked
 *
 */
import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import noop from 'lodash.noop';
import uniqueId from 'lodash.uniqueid';
import isFunction from 'lodash.isfunction';
import isBoolean from 'lodash.isboolean';
import PropTypes from 'prop-types';

import kindOf from '../util/kindOf';
import isPromise from '../util/isPromise';
import PopoverContent from './Content';
import PopoverTrigger from './triggers/Trigger';

const SKIPPED = () => {};

function handleBeforeHook(beforeFn, arity, continuation) {
  // There are parameters that are passed into continuation, which is controlled by the outside when the call is made
  if (arity >= 1) {
    return beforeFn(continuation);
  }

  // no parameters, if the return Promise so resolve after the call continuation;
  // If the return is not Promise, direct call Promise
  const mayBePromise = beforeFn();
  if (!isPromise(mayBePromise) && mayBePromise !== SKIPPED) {
    return continuation();
  }

  return mayBePromise.then(continuation);
}

export const PopoverContextType = {
  _boldruiPopover: PropTypes.shape({
    close: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    getContentNode: PropTypes.func.isRequired,
    getTriggerNode: PropTypes.func.isRequired,

    //  Used to maintain the Popover stack to handle nested problems
    registerDescendant: PropTypes.func,
    unregisterDescendant: PropTypes.func,
  }),
};

export default class Popover extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,

    // custom classname for trigger wrapper
    wrapperClassName: PropTypes.string,

    // container的display属性
    display: PropTypes.string,

    // position strategy
    position: PropTypes.func.isRequired,

    // 定位时的偏移量
    cushion: PropTypes.number,

    // Only the user triggered the opening / closing will trigger the two destroyed
    onBeforeClose: PropTypes.func,
    onBeforeShow: PropTypes.func,

    // it will be called whenever it is opened / closed
    onClose: PropTypes.func,
    onShow: PropTypes.func,

    // defaults to body
    containerSelector: PropTypes.string,

    children: PropTypes.node.isRequired,

    // both must appear together
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
  };

  static defaultProps = {
    prefix: 'boldr',
    className: '',
    wrapperClassName: '',
    display: 'block',
    onBeforeClose: noop,
    onBeforeShow: noop,
    onClose: noop,
    onShow: noop,
    cushion: 0,
    containerSelector: 'body',
  };

  static contextTypes = PopoverContextType;

  static childContextTypes = PopoverContextType;
  constructor(props) {
    super(props);

    // id is used to uniquely identify the popover instance
    this.id = uniqueId(`${props.prefix}-popover-internal-id-`);

    // Collect popover children
    this.descendants = [];

    if (!this.isVisibilityControlled(props)) {
      this.state = {
        visible: false,
      };
    }

    this.isUnmounted = false;
  }
  getChildContext() {
    return {
      _boldruiPopover: {
        close: this.close,
        open: this.open,
        getContentNode: this.getPopoverNode,
        getTriggerNode: this.getTriggerNode,

        registerDescendant: this.registerDescendant,
        unregisterDescendant: this.unregisterDescendant,
      },
    };
  }

  registerDescendant = popover => {
    this.descendants.push(popover);
  };

  unregisterDescendant = popover => {
    const idx = this.descendants.indexOf(popover);
    this.descendants.splice(idx, 1);
  };

  isVisibilityControlled(props) {
    const { visible, onVisibleChange } = props || this.props;
    const hasOnChange = isFunction(onVisibleChange);
    const hasVisible = isBoolean(visible);

    if ((hasVisible && !hasOnChange) || (hasOnChange && !hasVisible)) {
      throw new Error('visible and onVisibleChange must be used together');
    }

    return hasVisible && hasOnChange;
  }

  getVisible = (props, state) => {
    if (this.isVisibilityControlled(props)) {
      props = props || this.props;
      return props.visible;
    }

    state = state || this.state;
    return state.visible;
  };

  setVisible = (visible, props, state) => {
    props = props || this.props;
    state = state || this.state;
    const beforeHook = visible ? props.onBeforeShow : props.onBeforeClose;
    const onBefore = (...args) => {
      // make sure that the time will not trigger many times before hook
      if (this.pendingOnBeforeHook) {
        return SKIPPED;
      }

      this.pendingOnBeforeHook = true;
      return beforeHook(...args);
    };

    if (this.isVisibilityControlled(props)) {
      if (this.pendingOnBeforeHook || props.visible === visible) {
        return;
      }

      handleBeforeHook(onBefore, beforeHook.length, () => {
        props.onVisibleChange(visible);
        this.pendingOnBeforeHook = false;
      });
    } else {
      if (this.pendingOnBeforeHook || state.visible === visible) {
        return;
      }

      handleBeforeHook(onBefore, beforeHook.length, () => {
        this.safeSetState({ visible });
        this.pendingOnBeforeHook = false;
      });
    }
  };

  getPopoverNode = () => {
    return document.querySelector(`.${this.id}`);
  };

  onTriggerRefChange = triggerInstance => {
    this.triggerNode = ReactDOM.findDOMNode(triggerInstance);
  };

  getTriggerNode = () => {
    return this.triggerNode;
  };

  open = () => {
    this.setVisible(true);
  };

  close = () => {
    this.setVisible(false);
  };

  injectIsOutsideSelf = impl => {
    this.isOutsideSelf = impl;
  };

  // Popover up in the tree will call this method to see if the node lies outside
  isOutsideStacked = node => {
    if (this.isOutsideSelf) {
      //  In their own internal, certainly not outside
      if (!this.isOutsideSelf(node)) {
        return false;
      }
    }

    //  ask the following Popover whether outside
    if (this.descendants.some(popover => !popover.isOutsideStacked(node))) {
      return false;
    }

    return true;
  };

  validateChildren() {
    const { children } = this.props;
    const childArray = Children.toArray(children);

    if (childArray.length !== 2) {
      throw new Error('There must be one and only one trigger and content in Popover');
    }

    const { trigger, content } = childArray.reduce(
      (state, c) => {
        const type = c.type;
        if (kindOf(type, PopoverTrigger)) {
          state.trigger = c;
        } else if (kindOf(type, PopoverContent)) {
          state.content = c;
        }

        return state;
      },
      { trigger: null, content: null },
    );

    if (!trigger) {
      throw new Error('Missing trigger in Popover');
    }
    if (!content) {
      throw new Error('Missing content in Popover');
    }

    return { trigger, content };
  }

  safeSetState(updater, callback) {
    if (!this.isUnmounted) {
      return this.setState(updater, callback);
    }
  }

  componentDidMount() {
    const { _boldruiPopover: popover } = this.context || {};
    if (popover && popover.registerDescendant) {
      popover.registerDescendant(this);
    }

    if (this.isVisibilityControlled() && this.props.visible) {
      this.props.onShow();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const visible = this.getVisible();
    if (visible !== this.getVisible(prevProps, prevState)) {
      const afterHook = visible ? this.props.onShow : this.props.onClose;
      afterHook();
    }
  }

  componentWillUnmount() {
    const { _boldruiPopover: popover } = this.context || {};
    if (popover && popover.unregisterDescendant) {
      popover.unregisterDescendant(this);
    }

    this.isUnmounted = true;
  }

  render() {
    const { trigger, content } = this.validateChildren();
    const {
      display,
      prefix,
      className,
      wrapperClassName,
      containerSelector,
      position,
      cushion,
    } = this.props;
    const visible = this.getVisible();

    return (
      <div style={{ display }} className={cx(`${prefix}-popover-wrapper`, wrapperClassName)}>
        {React.cloneElement(trigger, {
          prefix,
          contentVisible: visible,
          onTriggerRefChange: this.onTriggerRefChange,
          getTriggerNode: this.getTriggerNode,
          getContentNode: this.getPopoverNode,
          open: this.open,
          close: this.close,
          isOutsideStacked: this.isOutsideStacked,
          injectIsOutsideSelf: this.injectIsOutsideSelf,
        })}
        {React.cloneElement(content, {
          prefix,
          className,
          id: this.id,
          getContentNode: this.getPopoverNode,
          getAnchor: this.getTriggerNode,
          visible,
          cushion,
          containerSelector,
          placement: position,
        })}
      </div>
    );
  }
}
