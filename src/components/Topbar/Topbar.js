import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Icon';

type Props = {
  toggleSidebar: () => void,
  // The links prop refers to links located to the right of the logo.
  links: Array<Object>,
  // Dropdown menu links for the username / avatar
  userLinks: Array<Object>,
  // Links to the left of the user avatar on the righthand side of bar.
  rightLinks: Array<Object>,
  avatarUrl: string,
  username: string,
};
const AvatarElement = styled.div`
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 0 auto;

`;
const InfoElement = styled.div`
  padding-left: 6px;
  padding-top: 6px;
`;
class Topbar extends Component {
  static defaultProps = {
    avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
    username: 'blank',
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }
  toggle = () => {
    this.props.toggleSidebar(false);
  };

  props: Props;
  render() {
    const { links, rightLinks, avatarUrl, username, userLinks } = this.props;
    return (
      <div className="boldrui-topbar">
        <Icon
          className="boldrui-toggler"
          onClick={ this.toggle }
          kind="menu"
        >
          ☰
        </Icon>
        <div className="boldrui-topbar-right">
          <div className="boldrui-topbar-user">
            <img className="boldrui-topbar-user-avatar" src="https://boldr.io/images/unknown-avatar.png" height="24" />
            { ' ' }
            <Link className="boldrui-topbar-user-link" to={ `/profiles/${this.props.username}` }>{ this.props.username }</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
