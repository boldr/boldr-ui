import React, { PropTypes } from 'react';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';

export type SwitchProps = {
  prefixCls?: string,
  size?: 'small' | 'default',
  className?: string,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (checked: boolean) => any,
  checkedChildren?: React.ReactNode,
  unCheckedChildren?: React.ReactNode,
  disabled?: boolean,
};

export default class Switch extends React.Component {
  static defaultProps = {
    prefixCls: 'boldrui-switch',
  };

  props: SwitchProps;

  render() {
    const { prefixCls, size, className = '' } = this.props;
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
    });
    return <RcSwitch { ...this.props } className={ classes } />;
  }
}
