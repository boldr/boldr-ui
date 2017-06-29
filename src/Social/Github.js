/* @flow */
import React from 'react';
import Icon from '../Icons';

type Props = {
  href: ?string,
  size: string,
};

const Github = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="github" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="github" color="#1c3050" size={props.size} />;
  }
};

const defaultProps = {
  size: '24px',
};

Github.defaultProps = defaultProps;

export default Github;
