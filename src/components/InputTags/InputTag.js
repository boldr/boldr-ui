import React from 'react';
import PropTypes from 'prop-types';

const InputTag = props => {
  const onRemoveClick = e => {
    e.preventDefault();

    props.onRemoveTag(e);
  };

  const removeIcon = !props.readOnly
    ? <a onClick={onRemoveClick}>
        {props.removeTagIcon || String.fromCharCode(215)}
      </a>
    : null;

  return (
    <li>
      {props.name}
      {removeIcon}
    </li>
  );
};

export default InputTag;

InputTag.propTypes = {
  name: PropTypes.string.isRequired,
  onRemoveTag: PropTypes.func,
  readOnly: PropTypes.bool,
  removeTagIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
