// @flow
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
  isTransparent?: boolean,
};

export function HeroVideo({ tag = 'div', ...props }: Props) {
  const className = classNames(
    'boldr-hero__video',
    {
      'is-transparent': props.isTransparent,
    },
    props.className,
  );

  const { ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(HeroVideo);
