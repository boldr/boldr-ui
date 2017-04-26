import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Radio extends Component {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    // will be rewrite by RadioGroup
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
    children: PropTypes.any,
  };

  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    style: {},
    onChange() {},
  };

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange = evt => {
    const { props } = this;

    props.onChange({
      target: {
        ...props,
        type: 'radio',
        checked: evt.target.checked,
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      },
    });
  };

  render() {
    const {
      checked,
      // onChange,
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,
      value, // eslint-disable-line

      ...others
    } = this.props;

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-radio-wrap`]: true,
      [`${prefix}-radio-checked`]: !!checked,
      [`${prefix}-radio-disabled`]: disabled || readOnly,
    });

    return (
      <label className={classString} style={style}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`} />
          <input
            {...others}
            type="radio"
            checked={!!checked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
