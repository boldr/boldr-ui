// @flow
import * as React from 'react';
import classNames from 'classnames';
// import NavLink from 'react-router-dom/NavLink';
import { StyleClasses } from '../theme/styleClasses';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  title?: string,
  className?: string,
  href?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_ITEM;
export function NavbarItem({ tag = 'div', render, isHoverable, hasDropdown, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-hoverable': isHoverable,
      'has-dropdown': hasDropdown,
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  if (render) {
    return render({ ...HTMLProps, className });
  }
  if (props.href) {
    return (
      <a className={className} href={props.href} {...HTMLProps}>
        {props.title}
      </a>
    );
  }
  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarItem);
