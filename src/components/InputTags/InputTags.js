/* eslint-disable no-return-assign, react/no-array-index-key,
react/jsx-no-bind, babel/no-invalid-this */
import React from 'react';
import PropTypes from 'prop-types';
import InputTag from './InputTag';

const InputTags = props => {
  let input = null;

  const addTag = () => {
    const { uniqueTags, onAdded, tags, maxTags } = props;

    if (maxTags > 0) {
      if (tags.length >= maxTags) {
        return;
      }
    }

    const value = input.value.trim();

    if (uniqueTags) {
      if (tags.indexOf(value) >= 0) {
        return;
      }
    }

    if (typeof onAdded !== 'undefined') {
      onAdded(value);
    }

    input.value = '';
  };

  const removeTag = index => {
    const { onRemoved } = props;
    const value = props.tags[index];

    if (typeof onRemoved !== 'undefined') {
      onRemoved(value, index);
    }
  };

  const onInputKey = e => {
    const { tags } = props;

    switch (e.keyCode) {
      case InputTags.KEYS.backspace:
        if (tags.length === 0 || !props.deleteOnKeyPress) {
          return;
        }

        if (input.value === '') {
          removeTag(tags.length - 1);
        }

        break;

      default:
        if (input.value === '') {
          return;
        }

        if (props.addKeys.indexOf(e.keyCode) !== -1) {
          if (InputTags.KEYS.enter !== e.keyCode) {
            e.preventDefault();
          }

          addTag();
        }

        break;
    }
  };

  const onInputChange = e => {
    const value = e.target.value.trim();

    if (typeof props.onInputChange !== 'undefined') {
      props.onInputChange(value);
    }
  };

  const { readOnly, removeTagIcon, placeholder, id } = props;

  //-- Render tags
  const tagItems = props.tags.map((tag, i) => {
    return (
      <InputTag
        key={i}
        name={tag}
        readOnly={readOnly}
        removeTagIcon={removeTagIcon}
        onRemoveTag={removeTag.bind(this, i)}
      />
    );
  });

  //-- Render the input field
  const tagInput = !props.readOnly
    ? <input
        type="text"
        role="textbox"
        autoComplete="off"
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={onInputChange}
        onKeyDown={onInputKey}
        ref={el => (input = el)}
      />
    : null;

  const classNames = readOnly
    ? 'boldrui-input-tags__container boldrui-input-tags__container_readonly'
    : 'boldrui-input-tags__container';

  return (
    <div className="boldrui-input-tags" id={id}>
      <ul className={classNames}>
        {tagItems}
      </ul>

      {tagInput}
    </div>
  );
};

//-- Keyboard key map
InputTags.KEYS = {
  enter: 13,
  tab: 9,
  spacebar: 32,
  backspace: 8,
  left: 37,
  right: 39,
};

//-- Property types
InputTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdded: PropTypes.func,
  onRemoved: PropTypes.func,
  onInputChange: PropTypes.func,
  maxTags: PropTypes.number,
  placeholder: PropTypes.string,
  deleteOnKeyPress: PropTypes.bool,
  addKeys: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  uniqueTags: PropTypes.bool,
  removeTagIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

//-- Default properties
InputTags.defaultProps = {
  maxTags: -1,
  placeholder: 'Add a tag',
  deleteOnKeyPress: true,
  addKeys: [InputTags.KEYS.enter, InputTags.KEYS.tab, InputTags.KEYS.spacebar],
  uniqueTags: false,
  readOnly: false,
};

export default InputTags;
