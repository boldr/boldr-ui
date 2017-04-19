/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp, get } from 'styled-tools';
import { mediaQuery } from '../../theme/theme';
import MenuIcon from '../Icons/MenuIcon';

const ToggleButton = styled.button`
  ${mediaQuery.large`display: ${ifProp('sidebarToggleable', 'block !important')};`}
  ${mediaQuery.large`display: none;`}
  display: block;
  fill: white;
  padding: 0;
  margin: 0;
  line-height: 0;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: color 250ms ease-in-out;
  margin-right: 10px;
`;
const Toggler = ({ children, ...props }) => {
  const { sidebarToggleable, iconColor } = props;
  return (
    <ToggleButton sidebarToggleable={sidebarToggleable} {...props}>
      <MenuIcon color={iconColor} />
    </ToggleButton>
  );
};

Toggler.propTypes = {
  sidebarToggleable: PropTypes.bool,
  children: PropTypes.node,
  iconColor: PropTypes.string,
};
Toggler.defaultProps = {
  iconColor: '#fff',
};

export default Toggler;
