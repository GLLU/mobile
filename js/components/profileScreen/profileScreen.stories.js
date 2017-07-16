import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileScreen from './ProfileScreen';

storiesOf('profile screen', module)
  .add('profile header without user image', () =>
    <ProfileScreenHeader />
  )
  .add('main profile screen', () =>
    <ProfileScreen />
  );

