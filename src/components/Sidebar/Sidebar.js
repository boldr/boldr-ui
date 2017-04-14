/* @flow */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';

import Anchor from '../Anchor';
import { Chevron, FaIcon } from './SidebarUtils';
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

type Props = {
  className: ?string,
  items: SidebarLinks,
  match: Object,
  logo: ?any,
  expanded: boolean,
  location: Object,
  linkComponent: ReactElement,
  chevronComponent: ReactElement,
  iconComponent: ReactElement,
  isPrimaryColor: boolean,
  // url for the logo image
  logoImg: string,
  // Where should the logo link to? Default is /
  logoLink: string,
  sidebarDark: boolean,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends Component {
  state = {
    activate: null,
  };
  props: Props;

  render() {
    // BASE_ELEMENT = boldrui-dash-sidebar
    const classes = classnames(BASE_ELEMENT, this.props.className);

    return (
      <SidebarWrapper { ...this.props }>
        <SidebarHeader
          isPrimaryColor={ this.props.isPrimaryColor }
          logoImg={ this.props.logoImg }
          logoLink={ this.props.logoLink }
        />
        <SidebarNav
          items={ this.props.items }
          activeItem={ this.props.location.path }
          linkComponent={ Anchor }
          chevronComponent={ Chevron }
          iconComponent={ FaIcon }
        />
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
