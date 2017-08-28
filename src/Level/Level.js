/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../theme/styleClasses';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isMobile?: boolean,
  className?: string,
  href?: string,
};

const BASE_ELEMENT = StyleClasses.LEVEL;
export function Level({ tag = 'nav', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-mobile': props.isMobile,
    },
    props.className,
  );

  const { ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Level);
