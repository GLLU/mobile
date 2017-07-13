import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import VolumeButton from './VolumeButton';

storiesOf('volume component', module)
  .add('volume button', () =>
    <VolumeButton togglePlaySoundAction={action('clicked-volume')} />
  )
  .add('volume button muted', () =>
    <VolumeButton isMuted togglePlaySoundAction={linkTo('button', 'with some emoji')} />
  );
