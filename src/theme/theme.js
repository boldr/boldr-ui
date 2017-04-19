import React, { Component } from 'react';
import { css, ThemeProvider } from 'styled-components';
import coolorsToHex from 'coolors-to-hex';
import { reversePalette } from 'styled-theme/composer';
import { font, palette } from 'styled-theme';
import colors from './colors';
import borders from './borders';
import fonts from './fonts';

const SIZES = {
  large: 1200,
  medium: 976,
  small: 768,
};

const theme = {
  palette: {
    primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
    secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
    danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
    alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
    success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
    grayscale: [
      '#212121',
      '#616161',
      '#9e9e9e',
      '#bdbdbd',
      '#e0e0e0',
      '#eeeeee',
      '#ffffff',
    ],
    white: ['#fff', '#fff', '#eee'],
  },
  fonts: {
    primary: 'Roboto, Helvetica, Roboto, sans-serif',
    pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
    quote: 'Georgia, serif',
  },
  borders: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
    radius: '3px',
  },
};

export const mediaQuery = Object.keys(SIZES).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = SIZES[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export default theme;
