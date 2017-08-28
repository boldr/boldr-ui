import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Headline from '../Headline';
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd } from '../Navbar';
import { Hero, HeroArticle, HeroBody, HeroHeader, HeroFooter, HeroVideo } from './index';

storiesOf('Hero', module).add('default', () =>
  <Hero isColor="success" isSize="medium">
    <HeroHeader>
      <Navbar isTransparent>
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
  </Hero>,
);
