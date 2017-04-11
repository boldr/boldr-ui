/* @flow */
import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import SidebarItem from '../SidebarItem';
import Icon from '../Icon';

type Props = {
  className: ?string,
  links: Array<Object>,
  onChange: () => void,
  logoClassName: ?string,
  match: Object,
  iconColor: ?string,
  logo: ?any,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
class Sidebar extends PureComponent {
  static defaultProps = {
    links: [],
    onChange: () => {},
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

  render() {
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
                text={ item.text }
                link={ item.link }
                iconColor={ this.props.iconColor }
                iconType={ item.iconType }
                links={ item.links }
                item={ item }
                match={ this.props.match }
              />
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Sidebar);
