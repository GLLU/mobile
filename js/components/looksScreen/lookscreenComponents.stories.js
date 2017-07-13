import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ItemBrandView from './information/ItemBrandView';

storiesOf('look screen components', module)
  .add('itemBrandView', () =>
  <View style={{backgroundColor:'red', flex:1,
  flexDirection:'column'}}>
    <ItemBrandView brand={{name:'a beautiful life'}} />
  </View>
  );
