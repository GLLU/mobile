// @flow

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';
import Colors from '../../styles/Colors.styles'
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';
const cameraIcon = require('../../../images/icons/Filter_black.png');
const deviceWidth = Dimensions.get('window').width;

export default class FeedTabs extends Component {
  constructor(props: object) {
    super(props);
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this.tempFunc = this.tempFunc.bind(this);
    this.renderNavigationButton = this.renderNavigationButton.bind(this);
    this.state = {
      index: 0,
      routes: [
        {key: 'following', title: 'Following'},
        {key: 'bestMatch', title: 'My Size'},
        {key: 'hot', title: "What's Hot"},
      ],
      filterIsOpen: false
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
      case 'following':
        return (<FollowingTabContent
          navigateTo={navigateTo}
          showBottomCameraButton={showBottomCameraButton}/>);
      case 'bestMatch':
        return (<BestMatchTabContent
          navigateTo={navigateTo} isTabOnFocus={this.state.index === 1}
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

  tempFunc() {
    this.setState({filterIsOpen: !this.state.filterIsOpen})
  }

  renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          style={styles.tabViewAnimatedContainer}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleIndexChange}
        />
        {this.renderNavigationButton(cameraIcon, this.tempFunc, styles.btnImage, styles.filterButtonContainer)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row', backgroundColor: Colors.backgroundGrey
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
    width: deviceWidth - 23,
  },
  indicatorStyle: {
    backgroundColor: Colors.secondaryColor,
    width: (deviceWidth - 23) / 3,
  },
  labelStyle: {
    color: Colors.black,
    fontWeight: '600',
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
  }
});
