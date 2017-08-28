// @flow
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function Footer({ tag = 'footer', ...props }: Props) {
  const className = classNames('boldrui-footer', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(Footer);
