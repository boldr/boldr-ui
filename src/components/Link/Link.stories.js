import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Link from './Link';

storiesOf('Link', module)
  .add('default', () => (
    <Link href="https://boldr.io">Boldr</Link>
  ))
  .add('reverse', () => (
    <Link href="https://boldr.io" reverse>Boldr</Link>
  ))
  .add('another palette', () => (
    <Link href="https://boldr.io" palette="secondary">
      Boldr
    </Link>
  ));
