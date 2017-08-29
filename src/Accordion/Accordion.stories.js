import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from './index';

storiesOf('Accordion', module).add('Default', () => (
  <Accordion accordion>
    <AccordionItem isExpanded>
      <AccordionItemTitle>
        <h1>Anything you'd like</h1>
      </AccordionItemTitle>
      <AccordionItemBody>
        <p>A story you havent told.</p>
      </AccordionItemBody>
    </AccordionItem>
    <AccordionItem>
      <AccordionItemTitle>
        <h3>A smaller title</h3>
        <div>With a bit of description</div>
      </AccordionItemTitle>
      <AccordionItemBody>
        <p>The story you just told</p>
      </AccordionItemBody>
    </AccordionItem>
  </Accordion>
));
