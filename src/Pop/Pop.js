import React, { Component } from 'react';
import cx from 'classnames';
import noop from 'lodash.noop';
import isFunction from 'lodash.isfunction';
import PropTypes from 'prop-types';

import isPromise from '../util/isPromise';
import Button from '../Button';
import { exposePopover } from '../Popover/withPopover';
import Popover from '../Popover';
import NoneTrigger from './NoneTrigger';
import getPosition from './position';

const { Trigger, withPopover } = Popover;
const stateMap = {
  onConfirm: 'confirmPending',
  onCancel: 'cancelPending',
};

class PopAction extends Component {
  // support asynchronous callback function
  // onConfirm / onCancel Asynchronously wait to disable user shutdown
  handleClick(callbackName) {
    const callback = this.props[callbackName];
    const { popover } = this.props;
    if (!isFunction(callback)) {
      return popover.close();
    }

    const { changePending } = this.props;
    const stateKey = stateMap[callbackName];
    const startClose = () => {
      changePending(stateKey, true);
    };
    const finishClose = () => {
      changePending(stateKey, false, popover.close);
    };

    if (callback.length >= 1) {
      startClose();
      return callback(finishClose);
    }

    const maybePromise = callback();
    if (isPromise(maybePromise)) {
      startClose();
      maybePromise.then(finishClose).catch(() => changePending(stateKey, false));
    } else {
      popover.close();
    }
  }

  handleConfirm = () => {
    this.handleClick('onConfirm');
  };

  handleCancel = () => {
    this.handleClick('onCancel');
  };

  render() {
    const {
      type,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      confirmPending,
      cancelPending,
    } = this.props;

    if (!onConfirm && !onCancel) {
      return null;
    }

    return (
      <div className="boldrui-pop-buttons">
        <Button
          loading={confirmPending}
          disabled={cancelPending}
          size="small"
          kind={type}
          onClick={this.handleConfirm}
        >
          {confirmText}
        </Button>
        <Button
          loading={cancelPending}
          disabled={confirmPending}
          size="small"
          onClick={this.handleCancel}
        >
          {cancelText}
        </Button>
      </div>
    );
  }
}

const BoundPopAction = withPopover(PopAction);

class Pop extends Component {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'none']),
    position: PropTypes.oneOf([
      'left-top',
      'left-center',
      'left-bottom',
      'right-top',
      'right-center',
      'right-bottom',
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]),

    // whether to press the small arrows to align the trigger to locate
    centerArrow: PropTypes.bool,

    // trigger is block level display
    block: PropTypes.bool,

    content: PropTypes.node,
    header: PropTypes.node,

    //  confirm form related
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'default', 'danger', 'success']),

    // After opening the callback function
    onShow: PropTypes.func,

    // After closing the callback function
    onClose: PropTypes.func,

    // open / close the callback function, only the action triggered by the user will be called; by external changes `visible` will not trigger
    onBeforeShow: PropTypes.func,
    onBeforeClose: PropTypes.func,

    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,

    // Only the trigger is valid for hover
    mouseLeaveDelay: PropTypes.number,
    mouseEnterDelay: PropTypes.number,
    quirk: PropTypes.bool,

    // only when trigger is click
    closeOnClickOutside: PropTypes.bool,
    isClickOutside: PropTypes.func,

    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    centerArrow: false,
    block: false,
    confirmText: 'Ok',
    cancelText: 'Cancel',
    type: 'primary',
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    className: '',
    wrapperClassName: '',
    prefix: 'boldrui',
    quirk: true,
  };

  state = {
    confirmPending: false,
    cancelPending: false,
  };

  changePending = (key, pending, callback) => {
    if (this.isUnmounted) {
      return;
    }

    this.setState(
      {
        [key]: pending,
      },
      callback,
    );
  };

  renderContent() {
    const {
      prefix,
      content,
      header,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      type,
    } = this.props;
    const { confirmPending, cancelPending } = this.state;

    return (
      <Popover.Content>
        {header &&
          <div className="boldrui-pop-header">
            {header}
          </div>}
        <div className="boldrui-pop-inner">
          {content}
          <BoundPopAction
            prefix={prefix}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmText={confirmText}
            cancelText={cancelText}
            confirmPending={confirmPending}
            cancelPending={cancelPending}
            changePending={this.changePending}
            type={type}
          />
        </div>
        <i className="boldrui-pop-arrow" />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const {
      trigger,
      visible,
      onVisibleChange,
      closeOnClickOutside,
      isOutside,
      mouseLeaveDelay,
      mouseEnterDelay,
      children,
      quirk,
    } = this.props;

    if (trigger === 'click') {
      return (
        <Trigger.Click autoClose={closeOnClickOutside} isOutside={isOutside}>
          {children}
        </Trigger.Click>
      );
    }

    if (trigger === 'hover') {
      return (
        <Trigger.Hover
          showDelay={mouseEnterDelay}
          hideDelay={mouseLeaveDelay}
          isOutside={isOutside}
          quirk={quirk}
        >
          {children}
        </Trigger.Hover>
      );
    }

    if (trigger === 'focus') {
      return (
        <Trigger.Focus>
          {children}
        </Trigger.Focus>
      );
    }

    if (trigger === 'none') {
      return (
        <NoneTrigger visible={visible} onVisibleChange={onVisibleChange}>
          {children}
        </NoneTrigger>
      );
    }

    return null;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      className,
      wrapperClassName,
      trigger,
      visible,
      prefix,
      block,
      onShow,
      onClose,
      position,
      centerArrow,
      onBeforeClose,
      onBeforeShow,
    } = this.props;
    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    const { confirmPending, cancelPending } = this.state;
    const closePending = confirmPending || cancelPending;

    return (
      <Popover
        visible={closePending ? true : visible}
        onVisibleChange={closePending ? noop : onVisibleChange}
        prefix={prefix}
        wrapperClassName={cx('boldrui-pop-wrapper', wrapperClassName)}
        className={cx('boldrui-pop', className)}
        cushion={10}
        position={getPosition(position, centerArrow)}
        display={block ? 'block' : 'inline-block'}
        onShow={onShow}
        onClose={onClose}
        onBeforeClose={onBeforeClose}
        onBeforeShow={onBeforeShow}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}

Pop.withPop = exposePopover('pop');

export default Pop;
