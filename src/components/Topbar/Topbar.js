/* @flow */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
// import { Dropdown, DropdownDashNav, DropdownItem } from 'reactstrap';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import Toolbar from 'react-md/lib/Toolbars';
import classnames from 'classnames';
import DashNav from '../DashNav';
import Icon from '../Icon';
import type { ReactElement } from '../../types/react.js.flow';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  me: Object,
  className: ?string,
  iconColor: ?string,
};

type State = {
  dropdownOpen: boolean,
};
const BASE_ELEMENT = StyleClasses.TOPBAR;
const { SubMenu } = DashNav;
const DashNavItemGroup = DashNav.ItemGroup;
class Topbar extends Component {
  static defaultProps: {
    iconColor: '#222',
  };
  state = {
    current: 'mail',
  };

  state: State;
  props: Props;
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const classes = classnames(BASE_ELEMENT, 'navbar', this.props.className);
    return (
      <div className={ classes }>
        <Toolbar colored title="Colored" nav={ null } actions={ null } />
      </div>
    );
  }
}

export default Topbar;
