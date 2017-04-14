import React, { Component } from 'react';
import { css, ThemeProvider } from 'styled-components';
import coolorsToHex from 'coolors-to-hex';
import { font, palette } from 'styled-theme';
import { reversePalette } from 'styled-theme/composer';

const SIZES = {
  large: 1200,
  medium: 976,
  small: 768,
};
const theme = {};

// theme.palette = {
//   primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
//   secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
//   danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
//   alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
//   success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
//   grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#eeeeee', '#ffffff'],
//   white: ['#fff', '#fff', '#eee'],
// };
theme.palette = {
  primary: coolorsToHex('https://coolors.co/1976d2-2196f3-71bcf7-97cef9-c2e2fb'),
  secondary: coolorsToHex('https://coolors.co/c2185b-e91e63-f06292-f48caf-f8bbd0'),
  danger: coolorsToHex('https://coolors.co/d32f2f-f44336-f8877f-f9a7a1-ffcdd2'),
  alert: coolorsToHex('https://coolors.co/ffa000-ffc107-ffd761-ffecb3-fff2ce'),
  success: coolorsToHex('https://coolors.co/388e3c-4caf50-7cc47f-9fd4a1-c8e6c9'),
  grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#ffffff'],
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
};

export const mediaQuery = Object.keys(SIZES).reduce(
  (accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = SIZES[label] / 16;
    accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
    return accumulator;
  },
  {},
);

const BoldrTheme = props => {
  return (
    <ThemeProvider theme={ theme }>
      {props.children}
    </ThemeProvider>
  );
};
export { theme };
export default BoldrTheme;
