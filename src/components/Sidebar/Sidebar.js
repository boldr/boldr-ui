/* @flow */
import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import SidebarItem from '../SidebarItem';
import Icon from '../Icon';

export type SidebarLink = {
  text: string,
  iconType: string,
  key: number,
  id: number,
  exact: ?boolean,
  link: string,
  links: ?SidebarLinks
};

export type SidebarLinks = Array<SidebarLink>;

type Props = {
  className: ?string,
  links: SidebarLinks,
  onChange: () => void,
  handleExpandClick: () => void,
  logoClassName: ?string,
  match: Object,
  iconColor: ?string,
  logo: ?any,
  expanded: boolean,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends PureComponent {
  static defaultProps = {
    links: [],
    onChange: () => {},
    handleExpandClick: () => {},
    expanded: true,
  };

  state = {
    visible: false,
  };

  props: Props;
  /**
   * Click handler for the sidebar navigation items
   * @param  {Object} item    the link Object
   * @param  {Object} subItem a nested/child link
   * @param  {Object} event   the click event
   * @return {any}
   */
  onClick = (item, subItem, event) => {
    this.props.onChange(item, subItem);
    this.close();
  };

  /**
   * Sets the visibility of the sidebar menu
   * @return {any}
   */
  close = () => {
    this.setState({
      visible: false,
    });
  };
  /**
   * closes this sidebar overlay
   * @param  {Object} event click event relating to menu button
   * @return {any}
   */
  closeOverlay = event => {
    this.close();
    event.preventDefault();
  };

  render() {
    // BASE_ELEMENT = boldrui-dash-sidebar
    const classes = classnames(BASE_ELEMENT, this.props.className);

    return (
      <div className={ classes }>
        <nav className="boldrui-dash-sidebar-nav">
          <ul className="nav">
            {this.props.links.map((item) => (
              <SidebarItem
                index={ item.id }
                key={ item.key }
                onClick={ this.onClick }
                handleExpandClick={ this.props.handleExpandClick }
                text={ item.text }
                link={ item.link }
                iconColor={ this.props.iconColor }
                iconType={ item.iconType }
                links={ item.links }
                item={ item }
                match={ this.props.match }
                expanded={ this.props.expanded }
              />
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Sidebar);
