/* @flow */
/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import ReactModal from 'react-modal';
import type { ReactChildren } from '../../types/react.js.flow';
import Paper from '../Paper';

type Props = {
  dataHook: () => void,
  onClose: () => void,
  children: ReactChildren,
  horizontalPosition: string,
  verticalPosition: string,
  e: Object,
  elem: any,
  zIndex: number,
  scrollable: boolean,
  isOpen: boolean,
  contentLabel: string,
  shouldCloseOnOverlayClick: boolean,
  onRequestClose: () => void,
  onAfterOpen: () => void,
  overlay: boolean,
  closeTimeoutMS: number,
};
export const positions = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

export const colors = {
  blue: 'blue',
  red: 'red',
  green: 'green',
};

const MOUSE_EVENTS_SUPPORTED = ['click'];
class Dialog extends Component {
  static defaultProps = {
    onOk: () => {},
    shouldCloseOnOverlayClick: false,
    horizontalPosition: 'center',
    verticalPosition: 'center',
    closeTimeoutMS: 500,
    scrollable: true,
  };
  componentDidMount() {
    const { dataHook } = this.props;
    if (dataHook) {
      this._addDataHook(dataHook);
    }

    if (typeof this.onClickOutside === 'function') {
      this._supportOnClickOutside();
    }
  }
  componentWillUnmount() {
    if ((this: any)._boundEvents) {
      (this: any)._boundEvents.forEach(eventName => {
        document.removeEventListener(
          eventName,
          this._onMouseEventsHandler,
          true,
        );
      });
    }
  }

  props: Props;
  checkIfEventOnElements(e: Object, elem: any) {
    let current = e.target;
    while (current.parentNode) {
      if (elem.indexOf(current) > -1) {
        return true;
      }
      current = current.parentNode;
    }

    return current !== document;
  }

  componentElements() {
    return [ReactDOM.findDOMNode(this)];
  }

  _onMouseEventsHandler = e => {
    if (!this.checkIfEventOnElements(e, this.componentElements())) {
      this.onClickOutside(e);
    }
  };

  _addDataHook = dataHook => {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      domNode.setAttribute('data-hook', dataHook);
    }
  };

  _supportOnClickOutside = () => {
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  };

  render() {
    const justifyContent = positions[this.props.horizontalPosition];
    const alignItems = positions[this.props.verticalPosition];

    const modalStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11 + (this.props.zIndex || 0),
        backgroundColor: this.props.overlay
          ? 'rgba(0, 0, 0, 0.65)'
          : 'transparent',
        display: 'flex',
        justifyContent,
        alignItems,
        overflowY: this.props.scrollable ? 'auto' : 'hidden',
      },
      content: {
        // Overriding defaults
        border: 'none',
        overflow: 'initial',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        minWidth: '400px',
        minHeight: '225px',
        borderRadius: '0px',
        padding: '0px',
        boxShadow: '0 0 14px 0 rgba(22, 45, 60, 0.3)',
        // Overriding defaults - END
        backgroundColor: 'transparent',
        marginBottom: '0px',
      },
    };

    const portalClassName = classnames('boldrui-modal__portal', {
      'boldrui-modal__portal-non-scrollable': !this.props.scrollable,
    });

    return (
      <ReactModal
        portalClassName="boldrui-modal__portal"
        overlayClassName="boldrui-modal__overlay"
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
        onRequestClose={this.props.onRequestClose}
        onAfterOpen={this.props.onAfterOpen}
        style={modalStyles}
        className="boldrui-modal__content"
        contentLabel={this.props.contentLabel}
        closeTimeoutMS={this.props.closeTimeoutMS}
      >

        {this.props.children}
      </ReactModal>
    );
  }
}

export default Dialog;
