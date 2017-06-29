/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type Props = {
  checked: ?number | boolean,
  disabled: ?boolean,
  readOnly: ?boolean,
  indeterminate: ?boolean,
  onChange?: () => void,
  className?: string,
  style: ?Object,
  prefix: ?string,
  children: ?ReactChildren,
  value?: number | string,
};

export default class Checkbox extends Component {
  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    style: {},
    onChange() {},
  };
  props: Props;
  onChange = evt => {
    const { props } = this;

    props.onChange({
      target: {
        ...props,
        type: 'checkbox',
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
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,
      indeterminate,
      value, // eslint-disable-line

      ...others
    } = this.props;

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-checkbox__wrap`]: true,
      [`${prefix}-checkbox__checked`]: !!checked,
      [`${prefix}-checkbox__disabled`]: disabled || readOnly,
      [`${prefix}-checkbox__indeterminate`]: indeterminate,
    });

    return (
      <label className={classString} style={style}>
        <span className={`${prefix}-checkbox`}>
          <span className={`${prefix}-checkbox__inner`} />
          <input
            {...others}
            type="checkbox"
            checked={checked && !indeterminate}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.onChange}
          />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
