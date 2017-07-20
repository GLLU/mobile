import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileScreen from './ProfileScreen';
import WalletScreen from './WalletScreen';

storiesOf('profile screen', module)
  .add('profile header without user image', () =>
    <ProfileScreenHeader />
  )
  .add('main profile screen', () =>
    <ProfileScreen />
  )
  .add('wallet screen', () => <WalletScreen />)
;

