/* @flow */
import React, { Component } from 'react';
import classnames from 'classnames';
import NavLink from 'react-router-dom/NavLink';

type Props = {
  href: string,
  className: string,
  label: string,
  children: any,
  onClick: () => void,
  icon: any,
};

const NavAnchor = (props: Props) => {
  const { href, className, label, onClick, icon } = props;
  return (
    <NavLink to={href} className="boldrui-link" onClick={onClick} title={label} {...props}>
      {props.icon ? <i className={classnames('fa', props.icon)} /> : null}
      {label}
    </NavLink>
  );
};

export default NavAnchor;
