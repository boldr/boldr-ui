import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import Select from './index';

const data = [{ id: 1, name: 'Penguin' }, { id: 2, name: 'Octopus' }, { id: 3, name: 'Sloth' }];
storiesOf('Select', module)
  .addDecorator(centered)
  .add('Default', () => <Select data={data} optionValue="id" optionText="name" />)
  .add('Disabled', () => <Select data={data} optionValue="id" optionText="name" disabled />)
  .add('Filter', () => (
    <Select
      data={data}
      optionValue="id"
      optionText="name"
      onEmptySelected={action(data)}
      filter={(item, keyword) => item.name.indexOf(keyword) > -1}
    />
  ))
  .add('Search', () => (
    <Select
      data={data}
      optionValue="id"
      optionText="name"
      search
      filter={(item, keyword) => {
        return `${item.value}` === `${keyword}`;
      }}
    />
  ))
  .add('Tags', () => (
    <Select
      data={data}
      optionValue="id"
      optionText="name"
      tags
      filter={(item, keyword) => item.name.indexOf(keyword) > -1}
    />
  ));
