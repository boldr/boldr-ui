import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../Icon';

type Props = {
  toggle: () => void,
  // The links prop refers to links located to the right of the logo.
  links: Array<Object>,
  // Dropdown menu links for the username / avatar
  userLinks: Array<Object>,
  // Links to the left of the user avatar on the righthand side of bar.
  rightLinks: Array<Object>,
  avatarUrl: string,
  username: string,
  // Where should the logo link to? Default is /
  logoLink: string,
};

class Topbar extends Component {
  static defaultProps = {
    avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
    username: 'blank',
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
    const { links, rightLinks, avatarUrl, username, userLinks } = this.props;
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
          <a
            className="boldrui-sidebar-toggler__alone navbar-toggler sidebar-toggler"
            onClick={ this.sidebarToggle }
            href="#"
          >
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
            <Link
              onClick={ this.toggle }
              className="nav-link"
              role="button"
              to={ `/profiles/${username}` }
            >
              <img src={ avatarUrl } className="img-avatar" alt="admin user ava" />
              <span className="hidden-md-down">{ username }</span>
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Topbar;