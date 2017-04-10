/* @flow */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../Icon';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  className: string,
  links: Array<Object>,
  key: string,
  onClick: () => void,
  match: Object,
  menuColor: ?string,
  logo: ?any,
  index: number,
  iconType: string,
  chevronColor: string,
  subItem: Object,
  item: Object,
  link: string,
  text: string,
};

// height is menu item height.
// we need it in JS instead CSS to calculate overall height of submenu.
// e.g. 10 items in submenu => height = 10 * 48 = 480px.
// we have to know the overall height to animate between height 0 and height 480.
// unfortunately we cannot animate between height 0 and height: auto.
// that's why we cannot set the height in css.
const height = 48;

const BASE_ELEMENT = StyleClasses.SIDEBAR_ITEM;

class SidebarItem extends Component {
  static defaultProps = {
    chevronColor: '#333',
  };
  state = {
    isOpen: false,
  };

  /**
   * Update parent component and open submenu on initial render
   */
  componentDidMount() {
    if (this.props.match.isExact) {
      this.onClick(this.props.item, this.props.subItem);
    }
  }
  props: Props;
  onClick = (item, subItem, e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    if ((item.links && !subItem) || (subItem && subItem.links)) {
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
      key,
      iconType,
      onClick,
      links,
      chevronColor,
      item,
      subItem,
      match,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <li
        className={ classnames(BASE_ELEMENT, {
          'has-children': links && links.length,
        }) }
      >
        <span className="boldrui-sidebar-icon"><Icon kind={ iconType } color="#222" /></span>
        <NavLink
          activeClassName="active"
          to={ link }
          className="boldrui-sidebar-link"
          title={ text }
          style={ { height } }
          onClick={ e => this.onClick(item, subItem, e) }
        >
          <span>{text}</span>
          {links
            ? <Icon
              kind="chevron-right"
              color={ chevronColor }
              className={ classnames('boldrui-sidebar-chevron', {
                'is-open': isOpen,
              }) }
            />
            : null}
        </NavLink>
        {links &&
          <ul
            className="boldrui-sidebar"
            style={ {
              display: isOpen ? null : 'none',
            } }
          >
            {links.map((subItem, j) => (
              <SidebarItem
                index={ index }
                subIndex={ j }
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
