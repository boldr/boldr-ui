import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const styles = {
  root: {
    display: 'flex',
  },
};

const SettingsItem = props => {
  return (
    <div
      style={{
        ...styles.root,
        ...props.style,
      }}
    >
      <div
        style={{
          width: 175,
          minWidth: 175,
          padding: '20px 10px 30px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text type="body1">
          {props.title}
        </Text>
        <Text type="caption">
          {props.description}
        </Text>
      </div>
      <div
        style={{
          padding: '20px 130px 13px 0',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  style: PropTypes.object,
};

export default SettingsItem;
