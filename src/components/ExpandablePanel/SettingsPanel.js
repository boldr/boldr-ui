/* @flow */
import React from 'react';
import type { ReactChildren } from '../../types/react.js.flow';

const styles = {
  root: {
    maxWidth: 800,
    margin: '0 auto',
  },
};

type Props = {
  children: ReactChildren,
  style: Object,
};
const SettingsPanel = (props: Props) => {
  return (
    <div
      style={{
        ...styles.root,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default SettingsPanel;
