// @flow

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';
import Fonts from '../../styles/Fonts.styles';
const filterIcon = require('../../../images/icons/Filter_black.png');
const deviceWidth = Dimensions.get('window').width;
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../../actions/feed';
import withAnalytics from '../common/analytics/WithAnalytics';


class FeedTabs extends Component {
  constructor(props: object) {
    super(props);
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._toggleFilterMenu = this._toggleFilterMenu.bind(this);
    this._renderNavigationButton = this._renderNavigationButton.bind(this);
    this.state = {
      index: 0,
      routes: [
        {key: FEED_TYPE_FOLLOWING, title: 'Following'},
        {key: FEED_TYPE_BEST_MATCH, title: 'My Size'},
        {key: FEED_TYPE_WHATS_HOT, title: "What's Hot"},
      ],
      filterIsOpen: false,
    };
  }

  _handleIndexChange = index => this.setState({index});

  _renderHeader = props => (
    <TabBar
      tabStyle={styles.tabStyle} style={styles.TabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle} {...props} />
  );

  _renderScene = ({route}) => {
    const {navigateTo, showBottomCameraButton} = this.props;

    switch (route.key) {
      case FEED_TYPE_FOLLOWING:
        return (<FollowingTabContent
          navigateTo={navigateTo}
          showBottomCameraButton={showBottomCameraButton}/>);
      case FEED_TYPE_BEST_MATCH:
        return (<BestMatchTabContent
          navigateTo={navigateTo} isTabOnFocus={this.state.index === 1}
          showBottomCameraButton={showBottomCameraButton}/>);
      case FEED_TYPE_WHATS_HOT:
        return (<WhatsHotTabContent
          navigateTo={navigateTo}
          showBottomCameraButton={showBottomCameraButton}/>);
      default:
        return <View style={{height: 200, width: 450, backgroundColor: 'red'}}/>
          ;
    }
  };

  _toggleFilterMenu() {
    this.props.logEvent('filterFeed', {feed: this.state.routes[this.state.index].key});
    this.props.toggleFilterMenues(this.state.routes[this.state.index].key);
  }

  _renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {hasUserSize} = this.props;
    return (
      <View style={styles.container}>
        <TabViewAnimated
          style={styles.tabViewAnimatedContainer}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleIndexChange}
        />
        { this.state.index === 1 && !hasUserSize ? null : this._renderNavigationButton(filterIcon, this._toggleFilterMenu, styles.btnImage, styles.filterButtonContainer)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row', backgroundColor: Colors.backgroundGrey,
  },
  tabViewAnimatedContainer: {
    width: deviceWidth,
    backgroundColor: Colors.primaryColor,
  },
  tabStyle: {
    height: 41.5,
    width: (deviceWidth - 23) / 3,
  },
  TabBar: {
    backgroundColor: Colors.backgroundGrey,
    height: 41.5,
  },
  indicatorStyle: {
    backgroundColor: Colors.secondaryColor,
    width: (deviceWidth - 23) / 3,
  },
  labelStyle: {
    color: Colors.black,
    fontFamily: Fonts.regularFont,
    textAlign: 'center',
    fontSize: generateAdjustedSize(12),
  },
  btnImage: {
    height: 23,
    width: 23,
    marginBottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  filterButtonContainer: {
    justifyContent: 'center',
    height: 41.5,
    backgroundColor: Colors.backgroundGrey,
    borderWidth: 0,
    position: 'absolute',
    marginRight: 5,
    paddingRight: 5,
    right: 0,
  },
});

export default withAnalytics(FeedTabs);
