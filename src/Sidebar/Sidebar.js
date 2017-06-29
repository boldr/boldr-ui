/* @flow */
import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';
import classnames from 'classnames';

import { StyleClasses } from '../theme/styleClasses';

import SidebarWrapper from './SidebarWrapper';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';

export type SidebarLink = {
  icon: string,
  id: number,
  label: boolean,
  link: string,
  items: ?SidebarLinks,
};

export type SidebarLinks = Array<SidebarLink>;

export type Props = {
  className: ?string,
  navClassName: ?string,
  items: SidebarLinks,
  location: Object,
  linkComponent: ReactElement,
  chevronComponent: ReactElement,
  iconComponent: ReactElement,
  isPrimaryColor: ?boolean,
  activeItem: string,
  // sidebar is hidden or visible? default visible
  visible: boolean,
  // expand or collapse menu item?
  expanded: boolean,
  onVisibilityChange: () => void,
  onExpandCollapse: () => void,
  iconColor: ?string,
  iconSize: ?string,
  // url for the logo image
  logoImg: string,
  // Where should the logo link to? Default is /
  logoLink: string,
  // light or dark themed sidebar
  sidebarDark: boolean,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends Component {
  static defaultProps = {
    isPrimaryColor: true,
    sidebarDark: true,
    logoImg: 'https://boldr.io/assets/boldr-logo-white.png',
  };
  state = {
    activate: null,
  };

  props: Props;

  render() {
    const classes = classnames(BASE_ELEMENT, this.props.className);

    return (
      <SidebarWrapper {...this.props}>
        <SidebarHeader
          isPrimaryColor={this.props.isPrimaryColor}
          logoImg={this.props.logoImg}
          logoLink={this.props.logoLink}
        />
        <SidebarNav
          items={this.props.items}
          isPrimaryColor={this.props.isPrimaryColor}
          activeItem={this.props.activeItem}
          navClassName={this.props.navClassName}
          location={this.props.location}
          expanded={this.props.expanded}
          iconColor={this.props.iconColor}
          iconSize={this.props.iconSize}
          onExpandCollapse={this.props.onExpandCollapse}
        />
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
