/* @flow */
import React from 'react';
import styled from 'styled-components';
import cxN from 'classnames';
import NavbarBrand from './NavbarBrand';

export type Props = {
  isFixed: boolean,
};

class NavbarMenu extends React.Component {
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
      <div
        id="boldrui-navbar-menu"
        className="boldrui-navbar-menu-right boldrui-navbar-menu boldrui-navbar-menu-material-cyan"
      >
        <ul className="boldrui-navbar-navigation">
          <NavbarBrand />
          <li className="boldrui-navbar-item active"><a>Item 1</a></li>
          <li className="boldrui-navbar-item"><a>Item 2</a></li>
          <li className="boldrui-navbar-item"><a>Item 3</a></li>
          <li className="boldrui-navbar-item"><a>Item 4</a></li>
        </ul>
      </div>
    );
  }
}

export default NavbarMenu;
