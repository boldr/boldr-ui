import React from 'react';
import { storiesOf } from '@storybook/react';

import Headline from './Headline';

export default storiesOf('Headline', module).add('defaults', () => (
  <div>
    <Headline type="h1">Heading 1</Headline>
    <Headline type="h2" text="Heading 2">
      Heading 2
    </Headline>
    <Headline type="h3" text="Heading 2">
      Heading 3
    </Headline>
    <Headline type="h4" text="Heading 2">
      Heading 4{' '}
    </Headline>
    <Headline type="h5" text="Heading 2">
      Heading 5
    </Headline>
    <Headline type="h6" text="Heading 2">
      Heading 6
    </Headline>
  </div>
));
