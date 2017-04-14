/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';
import SidebarNavItem from './SidebarNavItem';
import { createItemTree, toggleExpandedItemWithId, activateItemWithLink } from './SidebarUtils';
import type { SidebarLink, SidebarLinks } from './Sidebar';

const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV;
type Props = {
  className: ?string,
  items: SidebarLinks,
  logoClassName: ?string,
  match: Object,
  iconColor: ?string,
  logo: ?any,
  activeItem: ?string,
  location: Object,
  linkComponent: ReactElement,
  chevronComponent: ReactElement,
  iconComponent: ReactElement,
};

class SidebarNav extends Component {
  state = {
    items: [],
    activeItemLink: null,
  };

  // Create Item tree with additional properties
  componentWillMount() {
    const items = this.props.items ? createItemTree(this.props.items) : [];
    this.setState({ items });
  }

  componentWillReceiveProps(newProps: Object) {
    if (newProps && newProps.activeItem) {
      const items = activateItemWithLink(newProps.activeItem, this.state.items);
      this.setState({ activeItemLink: newProps.activeItem,
        items });
    }
  }
  props: Props;
  onItemClick = id =>
    e => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault();
      this.toggleItem(id);
    };

  toggleItem = id => {
    const items = toggleExpandedItemWithId(id, this.state.items);
    this.setState({ items });
  };

  renderItems = () =>
    this.state.items.map(item => (
      <SidebarNavItem
        key={ item.id }
        level={ 0 }
        linkComponent={ this.props.linkComponent }
        chevronComponent={ this.props.chevronComponent }
        iconComponent={ this.props.iconComponent }
        onItemClick={ this.onItemClick }
        { ...item }
      />
    ));

  render() {
    const { className } = this.props;
    const classes = classnames(BASE_ELEMENT, { 'boldr-theme': !this.props.className });
    return (
      <div className={ classes }>
        {this.renderItems()}
      </div>
    );
  }
}

export default SidebarNav;
