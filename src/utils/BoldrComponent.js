import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const MOUSE_EVENTS = ['click'];

class BoldrComponent extends Component {
  static propTypes = {
    dataHook: PropTypes.string,
  };
  constructor(params) {
    super(params);
    this._addDataHook = this._addDataHook.bind(this);
    this._supportOnClickOutside = this._supportOnClickOutside.bind(this);
    this._onMouseEventsHandler = this._onMouseEventsHandler.bind(this);
  }

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
    if (this._boundEvents) {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(eventName, this._onMouseEventsHandler, true);
      });
    }
  }
  checkIfEventOnElements(e, elem) {
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
    // eslint-disable-next-line
    return [ReactDOM.findDOMNode(this)];
  }

  _onMouseEventsHandler(e) {
    if (!this.checkIfEventOnElements(e, this.componentElements())) {
      this.onClickOutside(e);
    }
  }

  _addDataHook(dataHook) {
    // eslint-disable-next-line
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      domNode.setAttribute('data-hook', dataHook);
    }
  }

  _supportOnClickOutside() {
    MOUSE_EVENTS.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS;
  }
}

export default BoldrComponent;
