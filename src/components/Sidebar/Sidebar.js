/* @flow */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Button from 'react-md/lib/Buttons';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import Icon from '../Icon';
import SidebarItem from '../SidebarItem';

type Props = {
  className: ?string,
  links: Array<Object>,
  itemClassname: string,
  key: string,
  onChange: () => void,
  logoClassName: ?string,
  match: Object,
  menuColor: ?string,
  logo: ?any,
};

// height is menu item height.
// we need it in JS instead CSS to calculate overall height of submenu.
// e.g. 10 items in submenu => height = 10 * 48 = 480px.
// we have to know the overall height to animate between height 0 and height 480.
// unfortunately we cannot animate between height 0 and height: auto.
// that's why we cannot set the height in css.
const height = 48;
const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends React.Component {
  static defaultProps = {
    links: [],
    onChange: () => {},
    menuColor: '#333',
  };

  state = {
    visible: false,
  };
  props: Props;
  onClick = (item, subItem, event) => {
    this.props.onChange(item, subItem);
    this.close();
  };

  /**
   * Hide overlay
   */
  close = () => {
    this.setState({
      visible: false,
    });
  };

  closeOverlay = event => {
    this.close();
    event.preventDefault();
  };

  /**
   * Open overlay
   */
  open = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const classes = classnames(BASE_ELEMENT, this.props.className);
    const baseClass = classnames(BASE_ELEMENT, {
      'is-visible': this.state.visible,
    });
    const logoClass = classnames(`${BASE_ELEMENT}-logo`, this.props.logoClassName);
    return (
      <div>
        <nav className={ baseClass }>
          <div className={ logoClass }>
            <a href="#" onClick={ this.close }>
              {this.props.logo}
            </a>
          </div>
          <ul className="boldrui-sidebar">
            {this.props.links.map((item, index) => (
              <SidebarItem
                index={ index }
                key={ item.key }
                className={ this.props.itemClassname }
                onClick={ this.onClick }
                text={ item.text }
                link={ item.link }
                iconType={ item.iconType }
                links={ item.links }
                item={ item }
                match={ this.props.match }
              />
            ))}
          </ul>
        </nav>
        <div className="boldrui-sidebar-menu">
          <Button icon primary onClick={ this.open }>
            <Icon kind="menu" color={ this.props.menuColor } />
          </Button>
        </div>
        <div
          className={ classnames(`${BASE_ELEMENT}-nav__overlay`, {
            'is-visible': this.state.visible,
          }) }
          onClick={ this.closeOverlay }
          onTouchEnd={ this.closeOverlay }
        />
      </div>
    );
  }
}

export default withRouter(Sidebar);
