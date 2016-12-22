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

  _renderTabBar() {
    return <CustomTabBar underlineStyle={styles.customTabBar} inactiveTextColor={'#9E9E9E'} />;
  }

  render() {
    return(
      <View style={styles.mainView} scrollEnabled={false}>
        <Container>
            <Content theme={tabTheme} scrollEnabled={false}>
                <ScrollableTabView initialPage={2} locked={true} renderTabBar={() => this._renderTabBar()}>
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

export default MainView;
