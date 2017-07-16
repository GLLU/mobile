/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions, global-require */

import { AppRegistry, Platform } from 'react-native';

import { getStorybookUI, configure } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: '192.168.0.25' });
const appRegistryName = Platform.OS === 'ios' ? 'gllu' : 'infash'
AppRegistry.registerComponent(appRegistryName, () => StorybookUI);
export default StorybookUI;
