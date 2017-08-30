/* @flow */
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../theme/styleClasses';
import { getActiveModifiers, removeActiveModifiers, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isTransparent?: boolean,
  className?: string,
  children: Array<Node>,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_BURGER;
export function NavbarBurger({ tag = 'div', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getActiveModifiers(props),
    },
    props.className,
  );

  const { children, ...HTMLProps } = getDomSafeProps(props, removeActiveModifiers);

  return React.createElement(
    tag,
    { ...HTMLProps, className },
    // $FlowIssue
    React.createElement('span', null),
    // $FlowIssue
    React.createElement('span', null),
    // $FlowIssue
    React.createElement('span', null),
  );
}

export default createWrappedComponent(NavbarBurger);
