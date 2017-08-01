import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';

export default class FeedTabs extends PureComponent {


  _renderHeader = props => <TabBar
    tabStyle={styles.tabStyle} style={styles.TabBar}
    labelStyle={styles.labelStyle}
    indicatorStyle={styles.indicatorStyle} {...props} />;

  _renderScene = ({route}) => {
    const {navigateTo, showBottomCameraButton} = this.props;

    switch (route.key) {
      case 'following':
        return (<FollowingTabContent
          navigateTo={navigateTo}
          showBottomCameraButton={showBottomCameraButton}/>);
      case 'bestMatch':
        return (<BestMatchTabContent
          navigateTo={navigateTo} isTabOnFocus={this.props.feedsRoute.index === 1}
          showBottomCameraButton={showBottomCameraButton}/>);
      case 'hot':
        return (<WhatsHotTabContent
          navigateTo={navigateTo}
          showBottomCameraButton={showBottomCameraButton}/>);
      default:
        return <View style={{height: 200, width: 450, backgroundColor: 'red'}}/>
          ;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.props.feedsRoute}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this.props.handleIndexChange}
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
  },
});
