import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BlockedUserRow from "./BlockedUserRow";
import * as _ from "lodash";
import BlockedUsersScreen from "./BlockedUsersScreen";

storiesOf('blocked screen components', module)
  .add('blocked user row', () => {
      const user = {
        name: 'Gabe Narwhal',
        username: 'thegaben',
        avatar: {url: 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/9/j/u/9juawao-33e57.jpg'}
      };
      return (
        <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
          <BlockedUserRow
            {...user}
          />
        </View>
      )
    }
  ).add('Blocked Users Screen', () => {
    const user = {
      name: 'Gabe Narwhal',
      username: 'thegaben',
      avatar: {url: 'https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/9/j/u/9juawao-33e57.jpg'}
    };
    const users = _.times(50, (i) => ({...user, id: i}));
    return (
      <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
        <BlockedUsersScreen blockedUsers={users} totalBlockedUsersCount={users.length}
        />
      </View>
    )
  }
);


