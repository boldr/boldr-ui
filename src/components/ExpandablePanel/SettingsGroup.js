/* @flow */
import React from 'react';
import * as colors from 'material-ui/styles/colors';
import type { ReactChildren } from '../../types/react.js.flow';
import Text from './Text';

type Props = {
  title: string,
  style: Object,
  children: ReactChildren,
};

const styles = {
  root: {},
};

const SettingsGroup = (props: Props) => {
  return (
    <div
      style={{
        ...styles.root,
        ...props.style,
      }}
    >
      <div
        style={{
          padding: '10px 20px',
          backgroundColor: colors.grey200,
        }}
      >
        <Text type="body1">
          {props.title}
        </Text>
      </div>
      {props.children}
    </div>
  );
};

export default SettingsGroup;
