import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../Icon';

type Props = {
  toggle: () => void,
  links: Array<Object>,
  userLinks: Array<Object>,
  rightLinks: Array<Object>,
  user: Object,
  logoLink: string,
};

class Topbar extends Component {
  static defaultProps = {
    user: {
      avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
      username: 'blank',
    },
    logoLink: '/',
  };

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
    const { links, rightLinks, user, userLinks } = this.props;
    return (
      <header className="boldrui-dash-topbar navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
          onClick={ this.mobileSidebarToggle }
          type="button"
        >
          ☰
        </button>
        <Link className="navbar-brand" to={ this.props.logoLink } />
        {
          !links &&
          <a className="boldrui-sidebar-toggler__alone navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="#">
            ☰
          </a>
        }
        {links &&
          <ul className="nav navbar-nav hidden-md-down">
            <li className="nav-item">
              <a className="nav-link navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="#">
                ☰
              </a>
            </li>
            {links.map(lnk => (
              <li className="nav-item px-1" key={ lnk.key }>
                <Link className="nav-link" to={ lnk.link }>{lnk.text}</Link>
              </li>
            ))}
          </ul>}
        <ul className="boldrui-dash-topbar-right nav navbar-nav ml-auto">
          {
            rightLinks &&
            rightLinks.map(rlink => (
              <li className="nav-item hidden-md-down" key={ rlink.key }>
                <Link to={ rlink.link } className="nav-link">
                  { rlink.text }
                </Link>
              </li>
            ))
          }
          <li className="nav-item">
            <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
              <a
                onClick={ this.toggle }
                className="nav-link dropdown-toggle nav-link"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded={ this.state.dropdownOpen }
              >
                <img src={ user.avatarUrl } className="img-avatar" alt="admin user ava" />
                <span className="hidden-md-down">{ user.username }</span>
              </a>

              <DropdownMenu className="dropdown-menu-right">
                {
                  userLinks &&
                  userLinks.map(ulink => (
                    <DropdownItem key={ ulink.key }>
                      <Icon kind={ ulink.icon } color={ ulink.iconColor } />
                      <Link to={ ulink.link }>{ ulink.text }</Link>
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    );
  }
}

export default Topbar;
