/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';

import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.DASHBOARD_FOOTER;
type Props = {
  className: ?string,
  copyright: ?string,
};

const DashboardFooter = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <footer className={ classes }>
      <span className={ `${BASE_ELEMENT}-copyright` }>{ props.copyright }</span>
      <span className={ `${BASE_ELEMENT}-powered` }>Powered by <a href="https://boldr.io">Boldr</a></span>
    </footer>
  );
};

export default DashboardFooter;
