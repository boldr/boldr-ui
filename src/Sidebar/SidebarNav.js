/* @flow */
import React, { Component } from 'react';
import classnames from 'classnames';
import { StyleClasses, BOLDR_NS } from '../theme/styleClasses';
import SidebarNavItem from './SidebarNavItem';
import { createItemTree, toggleExpandedItemWithId, activateItemWithLink } from './SidebarUtils';
import type { SidebarLink, SidebarLinks } from './Sidebar';

const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV;
type Props = {
  navClassName: ?string,
  items: SidebarLinks,
  isPrimaryColor: ?boolean,
  activeItem: ?string,
  iconColor: ?string,
  iconSize: ?string,
  location: Object,
  expanded: boolean,
  onExpandCollapse: () => void,
};

class SidebarNav extends Component {
  state = {
    items: [],
    activeItemLink: null,
  };

  // Create Item tree with additional properties
  componentWillMount() {
    const items = this.props.items ? createItemTree(this.props.items) : [];
    this.setState({
      items,
      activeItemLink: this.props.location,
    });
  }

  componentWillReceiveProps(newProps: Object) {
    if (newProps && newProps.activeItem) {
      const items = activateItemWithLink(newProps.activeItem, this.props.items);
      this.setState({
        activeItemLink: newProps.activeItem,
        items,
      });
    }
  }

  props: Props;
  onItemClick = (id, items) => e => {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.toggleItem(id, items);
  };
  toggleItem = (id, items) => {
    if (this.props.onExpandCollapse) {
      this.props.onExpandCollapse();
    } else {
      toggleExpandedItemWithId(id, items);
    }
  };

  renderItems = () =>
    this.props.items.map(item =>
      <SidebarNavItem
        key={item.id}
        level={0}
        expanded={this.props.expanded}
        onExpandCollapse={this.props.onExpandCollapse}
        activeItem={this.props.activeItem}
        iconColor={this.props.iconColor}
        iconSize={this.props.iconSize}
        onItemClick={this.onItemClick}
        location={this.props.location}
        {...item}
      />,
    );

  render() {
    const { navClassName } = this.props;
    const classes = classnames(BASE_ELEMENT, {
      'boldr-theme': !this.props.navClassName,
    });
    return (
      <div className={classes}>
        {this.renderItems()}
      </div>
    );
  }
}

export default SidebarNav;
