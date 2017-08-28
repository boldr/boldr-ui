import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BoldrComponent from '../util/BoldrComponent';

class MenuItem extends BoldrComponent {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <li className={classNames('boldrui-menu__item')}>
        <button type="button" className="boldrui-menu__btn" onClick={this.props.onClick}>
          <span className="boldrui-menu__icon">
            {this.props.icon}
          </span>
          <span className="boldrui-menu__text">
            {this.props.text}
          </span>
        </button>
      </li>
    );
  }
}

export default MenuItem;
