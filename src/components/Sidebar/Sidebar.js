/* @flow */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';

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
  navClassName: ?string,
  items: SidebarLinks,
  match: Object,
  location: Object,
  linkComponent: ReactElement,
  chevronComponent: ReactElement,
  iconComponent: ReactElement,
  isPrimaryColor: ?boolean,
  activeItem: string,
  visible: boolean,
  expanded: boolean,
  onVisibilityChange: () => void,
  onExpandCollapse: () => void,
  // url for the logo image
  logoImg: string,
  // Where should the logo link to? Default is /
  logoLink: string,
  sidebarDark: boolean,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends Component {
  static defaultProps = {
    expanded: true,
    isPrimaryColor: true,
    logoImg: 'https://boldr.io/logo.png',
  };
  state = {
    activate: null,
  };
  componentWillMount() {
    this.setState({
      expanded: this.props.expanded !== null ? this.props.expanded : true,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    // If controlled then the open prop takes precedence.
    if (nextProps.expanded !== null) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
  }
  collapse = (reason) => {
    if (this.props.expanded === null) this.setState({ expanded: false });
    if (this.props.onExpandCollapse) this.props.onExpandCollapse(false, reason);
    return this;
  };

  expand = (reason) => {
    if (this.props.expanded === null) this.setState({ expanded: true });
    if (this.props.onExpandCollapse) this.props.onExpandCollapse(true, reason);
    return this;
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
          isPrimaryColor={ this.props.isPrimaryColor }
          activeItem={ this.props.activeItem }
          navClassName={ this.props.navClassName }
          location={ this.props.location }
          match={ this.props.match }
          expanded={ this.props.expanded }
          onExpandCollapse={ this.props.onExpandCollapse }
        />
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
