import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

setOptions({
  name: 'Boldr UI',
  url: 'https://github.com/strues/boldr',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: true,
  hierarchySeparator: /\/|\./,
});

setAddon(infoAddon);

function loadStories() {
  require('../src/styles/boldrui.scss');
  require('../src/Alert/Alert.stories');
  require('../src/Button/Button.stories');
  require('../src/Block/Block.stories');

  require('../src/ContentPromo/ContentPromo.stories');
  require('../src/Flag/Flag.stories');
  require('../src/Heading/Heading.stories');
  require('../src/ImageDisplay/ImageDisplay.stories');
  require('../src/Loader/Loader.stories');

  require('../src/Paper/Paper.stories');
  require('../src/Paragraph/Paragraph.stories');
  require('../src/Tag/Tag.stories');

  //
  require('../src/Select/Select.stories');
  require('../src/Pop/Pop.stories');
  require('../src/Tooltip/Tooltip.stories');
  require('../src/Card/Card.stories');
  require('../src/Tabs/Tabs.stories');
  require('../src/Dialog/Dialog.stories');
  require('../src/Menu/Menu.stories');
  require('../src/Accordion/Accordion.stories');
  require('../src/Level/Level.stories');
  require('../src/Hero/Hero.stories');
  require('../src/Navbar/Navbar.stories');
  // require('../stories');
}

configure(loadStories, module);
