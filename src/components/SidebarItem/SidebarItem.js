/* @flow */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../Icon';
import { StyleClasses } from '../../theme/styleClasses';
import type { SidebarLinks } from '../Sidebar';

type Props = {
  className: string,
  links: SidebarLinks,
  key: string,
  onClick: () => void,
  handleExpandClick: () => void,
  match: Object,
  logo: ?any,
  index: number,
  iconType: string,
  iconColor: string,
  subItem: Object,
  item: Object,
  link: string,
  text: string,
  expanded: ?boolean,
};

const height = 48;

const BASE_ELEMENT = StyleClasses.SIDEBAR_ITEM;

class SidebarItem extends Component {
  static defaultProps = {
    iconColor: '#fff',
    handleExpandClick: () => {},
  };
  state = {
    isOpen: null,
  };
  componentWillMount() {
    this.setState({
      isOpen: this.props.expanded !== null ? this.props.expanded : false,
    });
  }

  /**
   * Update parent component and open submenu on initial render
   */
  componentDidMount() {
    if (this.props.match.isExact) {
      this.onClick(this.props.item, this.props.subItem);
    }
  }
  componentWillReceiveProps(nextProps: Object) {
    // If controlled then the open prop takes precedence.
    if (nextProps.expanded !== null) {
      this.setState({
        isOpen: nextProps.expanded,
      });
    }
  }

  props: Props;

  onClick = (item, subItem, e) => {
    if ((item.links && !subItem) || (subItem && subItem.links)) {
      if (this.props.handleExpandClick) {
        this.props.handleExpandClick(false);
      }

      if (typeof this.props.expanded === 'undefined') {
        this.setState({ isOpen: false });
      }
      // simply open submenu without notifying parent or changing url
      if (e) {
        e.preventDefault();
      }
      return;
    }

    this.props.onClick(item, subItem, e);
  };

  render() {
    const {
      index,
      link,
      text,
      iconType,
      onClick,
      links,
      expanded,
      handleExpandClick,
      iconColor,
      item,
      subItem,
      match,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <li
        className={ classnames(BASE_ELEMENT, 'nav-item', {
          'nav-dropdown': links && links.length,
          open: links && this.state.isOpen,
        }) }
      >
        <NavLink
          to={ link }
          className="nav-link"
          activeClassName={ links ? null : 'active' }
          title={ text }
          style={ { height } }
          onClick={ e => this.onClick(item, subItem, e) }
        >
          <Icon className="boldrui-sidebar-icon" kind={ iconType } color={ iconColor } />
          <span className="boldrui-sidebar-link-txt">{text}</span>
          {links
            ? <Icon
              kind="chevron-right"
              color={ iconColor }
              className={ classnames('boldrui-sidebar-chevron', {
                open: isOpen,
              }) }
            />
            : null}
        </NavLink>

        {links &&
          <ul className="nav-dropdown-items">
            {links.map(subItem => (
              <SidebarItem
                index={ index }
                subIndex={ subItem.id }
                className={ this.props.className }
                key={ subItem.key }
                onClick={ subItem.links ? this.onClick : onClick }
                text={ subItem.text }
                iconType={ subItem.iconType }
                link={ `${link}${subItem.link}` }
                links={ subItem.links }
                item={ item }
                subItem={ subItem }
                match={ match }
              />
            ))}
          </ul>}
      </li>
    );
  }
}

export default SidebarItem;
