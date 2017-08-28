/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../theme/styleClasses';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_DIVIDER;

export function NavbarDivider({ tag = 'hr', isBoxed, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-boxed': isBoxed,
    },
    props.className,
  );

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarDivider);
