/* @flow */
import React, { Component } from 'react';
import classnames from 'classnames';
import Link from 'react-router-dom/Link';

type Props = {
  href: string,
  className: ?string,
  label: ?string,
  children: ?any,
  onClick: ?() => void,
};

const Anchor = (props: Props) => {
  const { href, className, label, onClick, children } = props;
  return (
    <Link to={href} className="boldrui-link" onClick={onClick} title={label} {...props}>
      {label || children}
    </Link>
  );
};

export default Anchor;
