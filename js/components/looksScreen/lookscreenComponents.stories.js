import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ItemBrand from './information/ItemBrand';
import ItemBrandsView from "./information/ItemBrandsView";

storiesOf('look screen components', module)
  .add('item brand', () =>
    <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
      <ItemBrand brand={{name: 'a beautiful life'}}/>
    </View>
  ).add('brands view', () => {
    const brands = [
      {id: 1, name: 'a beautiful Life'},
      {id: 2, name: 'zara'},
      {id: 3, name: 'lee cooper'},
      {id: 4, name: 'long island'},
      {id: 5, name: 'billabong'},
      {id: 6, name: 'american eagle'}
    ]
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <ItemBrandsView brands={brands}/>
      </View>
    )
  }
);
