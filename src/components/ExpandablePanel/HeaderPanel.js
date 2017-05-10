import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as colors from 'material-ui/styles/colors';
import Text from './Text';

const styles = {
  root: {
    padding: '36px 42px 5px 0',
    display: 'flex',
    backgroundColor: 'rgba(0, 188, 212, 1.00)',
  },
  image: {
    height: 124,
    width: 212,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const HeaderPanel = props => {
  return (
    <div
      style={{
        ...styles.root,
        ...props.style,
      }}
    >
      <div
        style={{
          ...styles.image,
          ...props.imageStyle,
        }}
      >
        <div
          style={{
            marginLeft: 50,
            width: 128,
            height: 128,
          }}
        >
          {props.image}
        </div>
      </div>
      <div
        style={{
          ...styles.text,
          ...props.textStyle,
        }}
      >
        <Text type="display1" style={{ color: colors.white }}>
          {props.title}
        </Text>
        <Text type="body1" style={{ color: colors.white }}>
          {props.subtitle}
        </Text>
        <Text type="body1" style={{ color: colors.white }}>
          {props.description}
        </Text>
      </div>
    </div>
  );
};

export default HeaderPanel;

HeaderPanel.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  imageStyle: PropTypes.object,
  textStyle: PropTypes.object,
  style: PropTypes.object,
};
