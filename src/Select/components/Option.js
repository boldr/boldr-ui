import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  static propTypes = {
    cid: PropTypes.string,
    value: PropTypes.any,
    text: PropTypes.any,
    onMouseEnter: PropTypes.func,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };
  optionClickHandler = event => {
    this.props.onClick(event, this.props.cid);
  };

  render() {
    const { className, text, value } = this.props;
    return (
      <span
        value={value}
        className={className}
        onClick={this.optionClickHandler}
        onMouseEnter={this.props.onMouseEnter}
      >
        {text}
      </span>
    );
  }
}

export default Option;
