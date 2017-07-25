import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import VolumeButton from './VolumeButton';
import CancelButton from './buttons/CancelButton';
import HalfScreenModalHeader from './headers/HalfScreenModalHeader';
import EmptyStateFullScreen from './EmptyStateScreen';

storiesOf('volume component', module)
  .add('volume button', () =>
    <VolumeButton togglePlaySoundAction={action('clicked-volume')} />
  )
  .add('volume button muted', () =>
    <VolumeButton isMuted togglePlaySoundAction={linkTo('button', 'with some emoji')} />
  );

storiesOf('button components', module)
  .add('cancel button', () =>
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CancelButton />
    </View>
  );

storiesOf('empty state', module)
  .add('full screen', () =>
    <EmptyStateScreen
      icon={require('../../../images/emptyStates/tag.png')}
      title={`OOOOPS...\n IT SEEMS LIKE YOU HAVE NO INTERNET`}
      buttonText={'TRY AGAIN'}
      subtitle={`We can’t provide our service without internet.\nPlease check your internet connectivity.`}
    />
  );
storiesOf('header components', module)
  .add('bottom modal header', () =>
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'column',
      }}>
      <HalfScreenModalHeader title="Information" />
    </View>
  );
