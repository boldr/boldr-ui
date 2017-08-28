import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import Pop from './index';

storiesOf('Pop', module).addDecorator(centered).add('Default', () =>
  <Pop trigger="hover" position="top-left" content="Top Left">
    <Button>TopLeft</Button>
  </Pop>,
);
