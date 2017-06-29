/* @flow */
import React from 'react';
import Icon from '../Icons';

type Props = {
  href: ?string,
  size: string,
};

const Facebook = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="facebook" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="facebook" color="#1c3050" size={props.size} />;
  }
};

const defaultProps = {
  size: '24px',
};

Facebook.defaultProps = defaultProps;

export default Facebook;
