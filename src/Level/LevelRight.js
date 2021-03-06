/* @flow */
import * as React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../theme/styleClasses';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.LEVEL_RIGHT;

export function LevelRight({ tag = 'div', ...props }: Props) {
  const className = classNames(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(LevelRight);
