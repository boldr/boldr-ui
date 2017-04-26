import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Group extends Component {
  static propTypes = {
    value: PropTypes.any,
    isValueEqual: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    style: {},
    isValueEqual(a, b) {
      return a === b;
    },
    onChange() {},
  };

  onRadioChange = e => {
    this.props.onChange(e);
  };

  render() {
    const { className, prefix, style, isValueEqual } = this.props;
    const children = React.Children.map(this.props.children, radio => {
      if (radio && radio.props) {
        return React.cloneElement(radio, {
          ...radio.props,
          onChange: this.onRadioChange,
          checked: isValueEqual(this.props.value, radio.props.value),
          disabled: radio.props.disabled !== void 0
            ? radio.props.disabled
            : this.props.disabled,
          readOnly: radio.props.readOnly !== void 0
            ? radio.props.readOnly
            : this.props.readOnly,
        });
      }
    });

    const classString = classNames({
      [`${prefix}-radio-group`]: true,
      [className]: !!className,
    });

    return <div className={classString} style={style}>{children}</div>;
  }
}
