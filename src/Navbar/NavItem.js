/* @flow */
import React from 'react';
import styled from 'styled-components';
import cxN from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import NavbarBrand from './NavbarBrand';

export type Props = {
  isFixed: boolean,
};

class NavItem extends React.Component {
  static defaultProps = {
    isFixed: true,
  };
  props: Props;
  render() {
    const { isFixed } = this.props;
    const navbarClassName = cxN({
      'boldrui-navbar-fixed': isFixed,
      'boldrui-navbar-static': !isFixed,
    });
    return (
      <li className="boldrui-navbar-item active">
        <NavLink to={props.href}>Item 1</NavLink>
      </li>
    );
  }
}

export default NavItem;
