import React from 'react';
import PropTypes from 'prop-types';

const SimpleTrigger = ({ prefixCls, onClick, text, placeholder }) => {
  return (
    <div className={`${prefixCls}-simple`} onClick={onClick}>
      {text || placeholder}
    </div>
  );
};

SimpleTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
};

export default SimpleTrigger;
