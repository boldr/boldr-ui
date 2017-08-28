import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  Navbar,
  NavbarDropdown,
  NavbarBrand,
  NavbarItem,
  NavbarBurger,
  NavbarStart,
  NavbarLink,
  NavbarDivider,
  NavbarEnd,
} from './index';

storiesOf('Navbar', module)
  .add('default', () =>
    <Navbar>
      <NavbarBrand>
        <NavbarItem>BoldrUI</NavbarItem>
        <NavbarBurger isActive={false} onClick={action('clicked')} />
      </NavbarBrand>
      <NavbarStart>
        <NavbarItem href="#/" title="Home" />
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem href="#/" title="Logout" />
      </NavbarEnd>
    </Navbar>,
  )
  .add('dropdown', () =>
    <Navbar>
      <NavbarBrand>
        <NavbarItem>BoldrUI</NavbarItem>
        <NavbarBurger isActive={false} onClick={action('clicked')} />
      </NavbarBrand>
      <NavbarStart>
        <NavbarItem href="#/" title="Home" />
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem hasDropdown isHoverable>
          <NavbarLink href="#/">About</NavbarLink>
          <NavbarDropdown>
            <NavbarItem href="#/" title="Example" />
            <NavbarItem href="#/" title="Foo" />
            <NavbarDivider />
            <NavbarItem href="#/" title="Bar" />
          </NavbarDropdown>
        </NavbarItem>
        <NavbarItem href="#/" title="Logout" />
      </NavbarEnd>
    </Navbar>,
  );
