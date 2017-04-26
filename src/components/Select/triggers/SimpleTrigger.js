import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimpleTrigger extends Component {
  render() {
    let { prefixCls, onClick } = this.props;

    return (
      <div className={`${prefixCls}-simple`} onClick={onClick}>
        {this.props.text || this.props.placeholder}
      </div>
    );
  }
}

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
};

export default SimpleTrigger;
