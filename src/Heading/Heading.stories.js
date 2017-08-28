import React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from './Heading';

export default storiesOf('Headings', module)
  .add('semantic headers', () =>
    <div>
      <Heading.H1>Heading H1</Heading.H1>
      <Heading.H2>Heading H2</Heading.H2>
      <Heading.H3>Heading H3</Heading.H3>
      <Heading.H4>Heading H4</Heading.H4>
      <Heading.H5>Heading H5</Heading.H5>
      <Heading.H6>Heading H6</Heading.H6>
    </div>,
  )
  .add('with sizes', () =>
    <div>
      <Heading.H1 size="h6">Heading H1 with h6 size</Heading.H1>
      <Heading.H2 size="h5">Heading H2 with h5 size</Heading.H2>
      <Heading.H3 size="h4">Heading H3 with h4 size</Heading.H3>
      <Heading.H4 size="h3">Heading H4 with h3 size</Heading.H4>
      <Heading.H5 size="h2">Heading H5 with h2 size</Heading.H5>
      <Heading.H6 size="h1">Heading H6 with h1 size</Heading.H6>
    </div>,
  );
