import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import Headline from '../Headline';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd } from '../Navbar';
import { Hero, HeroArticle, HeroBody, HeroHeader, HeroFooter, HeroVideo } from './index';

storiesOf('Hero', module).addDecorator(withKnobs).add('default', () => {
  const label = 'Colors';
  const options = {
    primary: 'Primary',
    success: 'Success',
    warning: 'Warning',
    dark: 'Dark',
    light: 'Light',
    black: 'Black',
    white: 'White',
  };
  const defaultValue = 'primary';
  const value = select(label, options, defaultValue);
  return (
    <Hero isColor={value} isSize="medium">
      <HeroHeader>
        <Navbar isTransparent={boolean('Transparent Nav', true)}>
          <NavbarBrand>
            <NavbarItem>BoldrUI</NavbarItem>
          </NavbarBrand>
          <NavbarEnd>
            <NavbarItem title="Home" />
            <NavbarItem title="About" />
          </NavbarEnd>
        </Navbar>
      </HeroHeader>

      <HeroBody>
        <Headline type="h1">Hero</Headline>
      </HeroBody>

      <HeroFooter>
        <Headline type="h1">Footer</Headline>
      </HeroFooter>
    </Hero>
  );
});
