import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ItemBrand from './information/ItemBrand';
import ItemBrandsView from "./information/ItemBrandsView";
import InformationView from "./information/InformationView";
import InformationViewFooter from "./information/InformationViewFooter";
import MenuView from "./menu/MenuView";

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
    ];
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <ItemBrandsView brands={brands}/>
      </View>
    )
  }
).add('Footer View', () => {
  const likes=693748512;
  const comments=1337;
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <InformationViewFooter likes={likes} comments={comments}/>
      </View>
    )
  }
).add('Information menu', () => {
    const items = [
      {brand: {id: 1, name: 'a beautiful Life'}},
      {brand: {id: 2, name: 'zara'}},
      {brand: {id: 3, name: 'lee cooper'}},
      {brand: {id: 4, name: 'long island'}},
      {brand: {id: 5, name: 'billabong'}},
      {brand: {id: 6, name: 'american eagle'}}
    ];
    const description='HAPATAKATA ASKD:LKA:LSD KL:ASKDL:A KSDL:KAS:L DK:LASSKD L:AKSDL:K A:LSDKL:AK SD';
    const likes=693748512;
    const comments=1337;
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <InformationView description={description} isOpen={true} items={items} likes={likes} comments={comments}/>
      </View>
    )
  }
).add('three dots menu - my prespective', () => {
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <MenuView isOpen={true} isMyLook={true}/>
      </View>
    )
  }
).add('three dots menu - their prespective', () => {
    return (
      <View style={{
        backgroundColor: 'red', flex: 1,
        flexDirection: 'column'
      }}>
        <MenuView isOpen={true} isMyLook={false}/>
      </View>
    )
  }
);

