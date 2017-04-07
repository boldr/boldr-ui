/* @flow */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
// import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import classnames from 'classnames';
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

class Topbar extends Component {
  static defaultProps: {
    iconColor: '#222',
  };
  constructor(props: Props) {
    super(props);

    (this: any).toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  state: State;
  props: Props;

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('boldrui-sidebar__hidden');
  }

  mobileSidebarToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('boldrui-sidebar-mobile__show');
  }

  asideToggle(e: Object) {
    e.preventDefault();
    // $FlowIssue
    document.body.classList.toggle('boldrui-aside-menu__hidden');
  }

  render() {
    const classes = classnames(BASE_ELEMENT, 'navbar', this.props.className);
    return (
      <header className={ classes }>
        <Icon
          kind="menu"
          className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
          onClick={ this.mobileSidebarToggle }
          color={ this.props.iconColor }
        />
        <span className="navbar-brand" />
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <Icon
              kind="menu"
              className="nav-link navbar-toggler sidebar-toggler"
              onClick={ this.sidebarToggle }
              color={ this.props.iconColor }
            />
          </li>
          <li className="nav-item px-1">
            <NavLink to="/admin" className="nav-link">Dashboard</NavLink>
          </li>
          <li className="nav-item px-1">
            <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Avatar src={ this.props.me.avatarUrl } className="img-avatar" role="presentation" />
            <Link to={ `/profiles/${this.props.me.username}` } className="boldrui-topbar-user">
              {this.props.me.firstName}
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Topbar;
