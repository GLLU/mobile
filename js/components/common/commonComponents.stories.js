import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import VolumeButton from './VolumeButton';
import CancelButton from "./buttons/CancelButton";
import HalfScreenModalHeader from "./headers/HalfScreenModalHeader";

storiesOf('volume component', module)
  .add('volume button', () =>
    <VolumeButton togglePlaySoundAction={action('clicked-volume')}/>
  )
  .add('volume button muted', () =>
    <VolumeButton isMuted togglePlaySoundAction={linkTo('button', 'with some emoji')}/>
  );

storiesOf('button components', module)
  .add('cancel button', () =>
    <View style={{
      backgroundColor: 'red', flex: 1,
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <CancelButton/>
    </View>
  );

storiesOf('header components', module)
  .add('bottom modal header', () =>
    <View style={{
      backgroundColor: 'red', flex: 1,
      flexDirection: 'column',
    }}>
      <HalfScreenModalHeader title='Information'/>
    </View>
  );