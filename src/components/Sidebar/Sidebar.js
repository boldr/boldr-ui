/* @flow */
import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import FontIcon from 'react-md/lib/FontIcons';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
  className: ?string,
};

const BASE_ELEMENT = StyleClasses.SIDEBAR;
const Sidebar = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={ classes }>
      <nav className={ `${BASE_ELEMENT}-nav` }>
        <ul className="nav">
          { props.children }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
