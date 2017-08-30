import React from 'react';
import cxN from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
// import Link from 'react-router-dom/Link';
import TouchRipple from '../util/TouchRipple';

const BLACK_LIST = [
  'type',
  'size',
  'htmlType',
  'block',
  'component',
  'disabled',
  'loading',
  'outline',
  'bordered',
  'className',
  'prefix',
];

const BTN_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);

const LINK_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);

export default class Button extends React.Component {
  static defaultProps = {
    kind: 'default',
    size: 'medium',
    htmlType: 'button',
    className: '',
    block: false,
    disabled: false,
    loading: false,
    outline: false,
    bordered: true,
    prefix: 'boldrui',
  };
  static propTypes = {
    kind: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'link']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    block: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    outline: PropTypes.bool,
    bordered: PropTypes.bool,
    target: PropTypes.string,
    href: PropTypes.string,
    prefix: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  handleClick = event => {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  startRipple = e => {
    this.refs.touchRipple.addRipple(e);
  };

  endRipple = () => {
    this.refs.touchRipple.removeRipple();
  };
  // render button
  renderButton(classNames) {
    const Element = this.props.component || 'button';
    const disabled = this.props.disabled || this.props.loading;
    const { htmlType } = this.props;
    const nodeProps = omit(this.props, BTN_BLACKLIST);

    return (
      <Element
        {...nodeProps}
        {...(htmlType ? { type: htmlType } : {})}
        className={classNames}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {this.props.children}
        <TouchRipple ref="touchRipple" className="btn-ripple" />
      </Element>
    );
  }
  // // render button as a link
  // renderLink(classNames) {
  //   const disabled = this.props.disabled || this.props.loading;
  //   const { href = '', target } = this.props;
  //   const nodeProps = omit(this.props, LINK_BLACKLIST);

  //   return (
  //     <Link
  //       {...(disabled ? {} : { to: href, target })}
  //       {...nodeProps}
  //       className={classNames}
  //       onClick={this.handleClick}
  //     >
  //       {this.props.children}
  //     </Link>
  //   );
  // }
  render() {
    const renderer = this.props.href || this.props.target ? 'renderButton' : 'renderButton';
    const {
      className,
      kind,
      size,
      block,
      disabled,
      loading,
      outline,
      bordered,
      prefix,
    } = this.props;

    const classNames = cxN(
      `${prefix}-btn`,
      {
        [`${prefix}-btn__${kind}${outline ? '-outline' : ''}`]: kind !== 'default',
        [`${prefix}-btn__${size}`]: size !== 'medium',
        [`${prefix}-btn__block`]: block,
        [`${prefix}-btn__loading`]: loading,
        [`${prefix}-btn__disabled`]: disabled,
        [`${prefix}-btn__border-transparent`]: !bordered,
      },
      className,
    );

    return this[renderer](classNames);
  }
}
