import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';
import Colors from '../../styles/Colors.styles'
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';

export default class FeedTabs extends PureComponent {
  state = {
    index: 0,
    routes: [
      {key: '1', title: 'Following'},
      {key: '2', title: 'My Size'},
      {key: '3', title: "What's Hot"},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderHeader = props => <TabBar
    tabStyle={styles.tabStyle} style={styles.TabBar}
    labelStyle={styles.labelStyle}
    indicatorStyle={styles.indicatorStyle} {...props} />;


  _renderScene = SceneMap({
    1: () => <FollowingTabContent
      navigateTo={this.props.navigateTo}
      showBottomCameraButton={this.props.showBottomCameraButton}/>,
    2: () => <BestMatchTabContent
      navigateTo={this.props.navigateTo}
      showBottomCameraButton={this.props.showBottomCameraButton}/>,
    3: () => <WhatsHotTabContent
      navigateTo={this.props.navigateTo}
      showBottomCameraButton={this.props.showBottomCameraButton}/>,
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
    backgroundColor: Colors.primaryColor,
  },
  tabStyle: {
    height: 41.5,
  },
  TabBar: {
    backgroundColor: Colors.backgroundGrey,
  },
  indicatorStyle: {
    backgroundColor: Colors.secondaryColor,
  },
  labelStyle: {
    color: Colors.black,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: generateAdjustedSize(13),
  }
});
