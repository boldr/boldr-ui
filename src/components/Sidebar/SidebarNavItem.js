/* eslint-disable  jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import type { SidebarLink, SidebarLinks } from './Sidebar';

const PARENT_ELEMENT = StyleClasses.SIDEBAR_NAV;
const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV_ITEM;

type SidebarNavItemProps = {
  label: string,
  id: | string | number,
  onItemClick: () => void,
  level: number,
  linkComponent: ReactElement,
  link: string,
  icon: string,
  active: boolean,
  expanded: boolean,
  items: SidebarLinks,
  chevronComponent: ReactElement,
  iconComponent: ReactElement,
};
/**
 * SidebarNavItem
 */
const SidebarNavItem = (props: SidebarNavItemProps) =>
  props.link
    ? <div className={ classnames(BASE_ELEMENT, `level-${props.level}`, { active: props.active }) }>
      {props.linkComponent
          ? React.createElement(props.linkComponent, {
            to: props.link,
            label: props.label,
            icon: props.icon ? `${props.icon} ${PARENT_ELEMENT}-icon` : null,
            className: `${BASE_ELEMENT}-link`,
          })
          : null}
    </div>
    : <div
      className={ classnames(BASE_ELEMENT, `level-${props.level}`, {
        collapsed: !props.expanded,
        expanded: props.expanded,
        active: props.active,
      }) }
      onClick={ props.onItemClick(props.id) }
    >
      <div className={ classnames(`${BASE_ELEMENT}-title`) }>
        {props.iconComponent && props.icon
            ? React.createElement(props.iconComponent, { className: classnames(`${PARENT_ELEMENT}-icon`, props.icon) })
            : null}
        {props.label}
        {props.chevronComponent
            ? React.createElement(props.chevronComponent, {
              expanded: props.expanded || props.active,
              className: classnames(`${PARENT_ELEMENT}-chevron`),
            })
            : null}
      </div>

      <div className={ classnames(`${BASE_ELEMENT}-children`) }>
        {props.items && Array.isArray(props.items)
            ? props.items.map(item => (
              <SidebarNavItem
                key={ item.id }
                level={ props.level + 1 }
                linkComponent={ props.linkComponent }
                chevronComponent={ props.chevronComponent }
                iconComponent={ props.iconComponent }
                onItemClick={ props.onItemClick }
                { ...item }
              />
              ))
            : null}
      </div>
    </div>;

SidebarNavItem.defaultProps = {
  link: null,
  icon: null,
  active: false,
  expanded: false,
  items: null,
  chevronComponent: null,
  iconComponent: null,
  linkComponent: null,
};

export default SidebarNavItem;
