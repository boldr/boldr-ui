/* @flow */
import React from 'react';
import classnames from 'classnames';

import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  className: ?string,
  text: string,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR_TITLE;

const SidebarTitle = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <li className={ classes }>
      { props.text }
    </li>
  );
};

export default SidebarTitle;
