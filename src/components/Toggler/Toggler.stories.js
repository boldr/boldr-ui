import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Toggler from './Toggler';

stories.add('default', () => <Toggler onClick={action('clicked')} />);
