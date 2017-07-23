import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';

export default class FeedTabs extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Following' },
      { key: '2', title: 'Best Match' },
      { key: '3', title: "What's Hot" },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    1: ()=><FollowingTabContent navigateTo={this.props.navigateTo} />,
    2: ()=><BestMatchTabContent navigateTo={this.props.navigateTo} />,
    3: ()=><WhatsHotTabContent navigateTo={this.props.navigateTo} />,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
