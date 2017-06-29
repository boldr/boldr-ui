/* @flow */
import React from 'react';
import Icon from '../Icons';

type Props = {
  href: ?string,
  size: string,
};

const LinkedIn = (props: Props) => {
  if (props.href) {
    return (
      <a href={props.href} target="_blank">
        <Icon kind="linkedin" color="#1c3050" size={props.size} />
      </a>
    );
  } else {
    return <Icon kind="linkedin" color="#1c3050" size={props.size} />;
  }
};

const defaultProps = {
  size: '24px',
};

LinkedIn.defaultProps = defaultProps;

export default LinkedIn;
