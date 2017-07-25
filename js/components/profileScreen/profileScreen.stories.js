import React from 'react';
import {View, Text} from 'react-native';
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
  .add('menu', () =>
  <View style={{height:300, backgroundColor:'yellow'}}>
      <MenuContext style={{ flex: 1 }}>
        <View style={{ padding: 10, flexDirection: 'row'}}>
          <Menu style={{flex:1, alignItems:'flex-end'}} onSelect={value => alert(`User selected the number ${value}`)}>
            <MenuTrigger>
              <Text style={{ fontSize: 24, color: 'black' }}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1}>
                <Text style={{fontSize:20, marginTop:6, marginBottom: 6}}>One</Text>
              </MenuOption>
              <MenuOption value={2}>
                <Text style={{fontSize:20, marginTop:6, marginBottom: 6}}>Two</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </MenuContext>
    <Text>Martin</Text>
    <Text>Martin</Text>
    <Text>Martin</Text>

  </View>

  )
  .add('wallet screen', () => <WalletScreen />)
;

