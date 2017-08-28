import React from 'react';
import PropTypes from 'prop-types';

const SelectTrigger = ({ prefixCls, onClick, text, placeholder }) => {
  return (
    <div className={`${prefixCls}-text`} onClick={onClick}>
      {text || placeholder}
    </div>
  );
};

SelectTrigger.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};

export default SelectTrigger;
