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
  logo: ?any,
  index: number,
  iconType: string,
  iconColor: string,
  chevronColor: string,
  subItem: Object,
  item: Object,
  link: string,
  text: string,
};

const height = 48;

const BASE_ELEMENT = StyleClasses.SIDEBAR_ITEM;

class SidebarItem extends Component {
  static defaultProps = {
    iconColor: '#fff',
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

  handleClick = e => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };
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
      iconType,
      onClick,
      links,
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
          activeClassName="active"
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
