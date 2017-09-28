import { configure } from '@storybook/react';
// import { setOptions } from '@storybook/addon-options';
//
// setOptions({
//   name: 'cam0 [front-end]',
//   goFullScreen: false,
//   showLeftPanel: true,
//   showDownPanel: true,
//   showSearchBox: false,
//   downPanelInRight: true,
//   sortStoriesByKind: false,
//   hierarchySeparator: /\/|\./,
// });
//


function loadStories() {
  require('../stories');
}

configure(loadStories, module);
