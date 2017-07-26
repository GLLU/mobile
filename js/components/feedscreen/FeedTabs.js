import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import FollowingTabContent from './FollowingTabContentContainer';
import BestMatchTabContent from './BestMatchTabContentContainer';
import WhatsHotTabContent from './WhatsHotTabContentContainer';
import Colors from '../../styles/Colors.styles'
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';
const cameraIcon = require('../../../images/icons/Filter_black.png');
const deviceWidth = Dimensions.get('window').width;

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

  _renderHeader = props => (
    <TabBar
      tabStyle={styles.tabStyle} style={styles.TabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle} {...props} />
  );


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

  tempFunc() {
    console.log('boom')
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
