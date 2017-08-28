/* @flow */
import * as React from 'react';
import classNames from 'classnames';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';
import { StyleClasses } from '../theme/styleClasses';

export type Props = {
  tag?: string,
  isHoverable?: boolean,
  hasDropdown?: boolean,
  render?: Function,
  className?: string,
  href?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_LINK;

export function NavbarLink({ tag = 'a', render, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  if (render) {
    return render({ ...props, className });
  }

  const HTMLProps = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(NavbarLink);
