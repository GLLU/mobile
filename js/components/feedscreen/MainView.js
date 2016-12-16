'use strict';

import React, { Component } from 'react';
import { View, Container, Content } from 'native-base';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./CustomTabBar');

import NewTab from './NewTab';
import FollowingTab from './FollowingTab';
import AllTab from './AllTab';

import tabTheme from './../../themes/tab';
import styles from './styles';

class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.mainView}>
        <Container>
            <Content theme={tabTheme}>
                <ScrollableTabView initialPage={2} locked={true} renderTabBar={() => <CustomTabBar underlineStyle={styles.customTabBar} inactiveTextColor={'#9E9E9E'} />}>
                    <NewTab tabLabel='New' />
                    <FollowingTab tabLabel='Following' />
                    <AllTab tabLabel='All' />
                </ScrollableTabView>
            </Content>
        </Container>
      </View>
    )
  }
}

module.exports = MainView;
