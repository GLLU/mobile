// @flow

import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import FeedLikesView from "./items/FeedLikesView";
import FeedCommentsView from "./items/FeedCommentsView";

storiesOf('feed screen components', module)
  .add('like view liked', () =>
    <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
      <FeedLikesView item={{likes:17982,liked:true}} onPress={action('like=pressed')} onLikesNumberPress={action('likes-number-pressed')}/>
    </View>
  ).add('like view not liked', () =>
  <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
    <FeedLikesView item={{likes:17982,liked:false}} onPress={action('like=pressed')} onLikesNumberPress={action('likes-number-pressed')}/>
  </View>
).add('like view no likes', () =>
  <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
    <FeedLikesView item={{likes:0,liked:false}} onPress={action('like=pressed')} onLikesNumberPress={action('likes-number-pressed')}/>
  </View>
).add('comment view with comments', () =>
  <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
    <FeedCommentsView comments={17878123} onPress={action('comments=pressed')}/>
  </View>
).add('comment view zero comments', () =>
  <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
    <FeedCommentsView comments={0} onPress={action('comments=pressed')}/>
  </View>
);


