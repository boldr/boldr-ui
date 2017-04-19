import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';

export const fontSize = ({ size }) => `${0.75 + 1 * (1 / size)}rem`;

const styles = css`
  font-family: ${font('primary')};
  font-weight: 500;
  font-size: ${fontSize};
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 0.57142em;
  color: ${palette({ grayscale: 0 }, 1)};
`;

const Heading = styled(({
  size,
  children,
  reverse,
  palette,
  theme,
  ...props
}) => React.createElement(`h${size}`, props, children))`${styles}`;

Heading.propTypes = {
  size: PropTypes.number,
  children: PropTypes.node,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
};

Heading.defaultProps = {
  size: 1,
  palette: 'grayscale',
};

export default Heading;
