import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import configureStore from '../dev/store';
import theme from '../src/theme/theme';

const store = configureStore({});

function loadStories() {
  require('../src/components/Block/Block.stories.js');
  require('../src/components/Caption/Caption.stories.js');
  require('../src/components/Input/Input.stories.js');
  require('../src/components/Link/Link.stories.js');
  require('../src/components/Paragraph/Paragraph.stories.js');
  require('../src/components/Photo/Photo.stories.js');
  require('../src/components/Toggler/Toggler.stories.js');
}

addDecorator(story => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </Provider>
));

configure(loadStories, module);
