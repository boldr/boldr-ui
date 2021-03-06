import PropTypes from 'prop-types';
import { Component } from 'react';

export default class WindowEventHandler extends Component {
  static propTypes = {
    eventName: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    useCapture: PropTypes.bool,
  };

  static defaultProps = {
    useCapture: false,
  };

  componentDidMount() {
    const { eventName, callback, useCapture } = this.props;
    window.addEventListener(eventName, callback, useCapture);
  }

  componentWillUnmount() {
    const { eventName, callback, useCapture } = this.props;
    window.removeEventListener(eventName, callback, useCapture);
  }

  render() {
    return null;
  }
}
