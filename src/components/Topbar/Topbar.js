import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

type Props = {
  toggle: () => void,
  links: Array<Object>,
};

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('boldrui-dash-sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('boldrui-dash-sidebar-mobile-show');
  }
  props: Props;
  render() {
    const { links } = this.props;
    return (
      <header className="boldrui-dash-topbar navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
          onClick={ this.mobileSidebarToggle }
          type="button"
        >
          ☰
        </button>
        <a className="navbar-brand" href="#" />
          {links &&
            <ul className="nav navbar-nav hidden-md-down">
              <li className="nav-item">
                <a
                  className="nav-link navbar-toggler sidebar-toggler"
                  onClick={this.sidebarToggle}
                  href="#"
                >
                  ☰
                </a>
              </li>
              {links.map(lnk => (
                <li className="nav-item px-1">
                  <Link className="nav-link" to={ lnk.link }>{ lnk.text }</Link>
                </li>
              ))}
            </ul>}
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#">
            temp
            </a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#"><i className="icon-list" /></a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#">
              <i className="icon-location-pin" />
            </a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
              <a
                onClick={this.toggle}
                className="nav-link dropdown-toggle nav-link"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded={this.state.dropdownOpen}
              >
                <img
                  src="https://boldr.io/images/unknown-avatar.png"
                  className="img-avatar"
                  alt="admin user ava"
                />
                <span className="hidden-md-down">admin</span>
              </a>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center">
                  <strong>Account</strong>
                </DropdownItem>

                <DropdownItem>
                  <i className="fa fa-bell-o" />
                  {' '}
                  Updates
                  <span className="badge badge-info">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-envelope-o" />
                  {' '}
                  Messages
                  <span className="badge badge-success">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-tasks" />
                  {' '}
                  Tasks
                  <span className="badge badge-danger">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-comments" />
                  {' '}
                  Comments
                  <span className="badge badge-warning">42</span>
                </DropdownItem>

                <DropdownItem header className="text-center">
                  <strong>Settings</strong>
                </DropdownItem>

                <DropdownItem>
                  <i className="fa fa-user" /> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-wrench" /> Settings
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-usd" />
                  {' '}
                  Payments
                  <span className="badge badge-default">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-file" />
                  {' '}
                  Projects
                  <span className="badge badge-primary">42</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="fa fa-shield" /> Lock Account
                </DropdownItem>
                <DropdownItem><i className="fa fa-lock" /> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    );
  }
}

export default Topbar;
