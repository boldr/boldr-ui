/* @flow */
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import FontIcon from 'react-md/lib/FontIcons';
import classnames from 'classnames';

import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  href: string,
  className: ?string,
  activeClassName: ?string,
  icon: string,
  text: string,
};
const BASE_ELEMENT = StyleClasses.SIDEBAR_LINK;
const SECOND_ELEMENT = StyleClasses.SIDEBAR_LINK_ACT;

const SidebarLink = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  const secondaryClasses = classnames(BASE_ELEMENT, props.className);
  return (
    <li className="nav-item">
      <NavLink to={ props.href } className={ classes } activeClassName={ secondaryClasses }>
        <FontIcon>{ props.icon }</FontIcon> { props.text }
      </NavLink>
    </li>
  );
};

export default SidebarLink;
