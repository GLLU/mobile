// @flow

import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableHighlight, Image, Animated, Dimensions } from 'react-native';
import { TabBarTop, TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar } from 'react-native-tab-view';
import I18n from 'react-native-i18n';

import ParallaxView from '../../utils/ParallaxView';
import ProfileScreenHeader from './ProfileScreenHeader';
import ScalableText, { generateAdjustedSize } from '../../utils/AdjustedFontSize';
import UserLooks from './UserLooks';
import SettingsScreen from '../settingsScreen/SettingsContainer';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

const parallaxHeaderHeight = 300;
const stickyHeaderHeight = Platform.OS === 'ios' ? 66 : 46;

type Props = {
  number: string,
  text: string,
  getStats: () => void,
  userId: number,
  isMyProfile: boolean,
  getUserBalance: () => void,
  getUserLooks: () => void,
  navigateTo: () => void,
  balance: number,
  isFollowing: boolean,
  userData: any,
  onStatClicked: () => void,
  stats: any,
  goBack: () => void,
  logEvent: () => void
};

class ProfileScreen extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'looks', title: I18n.t('LOOKS'), index: 0 },
        { key: 'wallet', title: I18n.t('WALLET'), index: 1 },
        { key: 'closet', title: I18n.t('CLOSET'), index: 2 },
        { key: 'settings', title: I18n.t('SETTINGS'), index: 3 },
      ],
    };
  }

  componentWillMount() {
    const { getStats, userId, isMyProfile, getUserBalance, getUserLooks } = this.props;

    getStats(userId);

    if (isMyProfile) {
      getUserBalance(userId);
    }

    this.setState({ isLoading: true }, () => {
      getUserLooks({ id: userId, all: isMyProfile }).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render(): React.Element<any> {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ParallaxView
          stickyHeaderHeight={stickyHeaderHeight}
          backgroundSpeed={10}
          backgroundColor={'#3e3e3e'}
          parallaxHeaderHeight={parallaxHeaderHeight}
          renderForeground={() => this._renderParallaxHeader()}
          renderFixedHeader={() => this._renderFixedHeader()}
          renderStickyHeader={() => this._renderStickyHeader()}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          {this._renderBody()}
        </ParallaxView>
      </View>

    );
  }

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderHeader = props => (
    <TabBar
      {...props}
      pressColor="rgba(255, 64, 129, .5)"
      onTabPress={this._handleTabItemPress}
      renderLabel={this._renderLabel(props)}
      indicatorStyle={styles.indicator}
      tabStyle={styles.tab}
      scrollEnabled
      style={styles.tabbar}
    />
  );

  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(inputIndex => inputIndex === index ? Colors.highlightColor : '#5a6f88');
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    });

    return (
      <Animated.Text numberOfLines={1} style={[styles.label, { color }]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderScene = ({ route }) => {
    const { userId, navigateTo, navigation, isMyProfile, meta, userLooks, editNewLook, addNewLook, likeUpdate, unlikeUpdate } = this.props;

    switch (route.key) {
      case 'looks':
        return (
          <UserLooks
            myUserId={userId}
            userLooks={userLooks}
            navigateTo={navigateTo}
            isMyProfile={isMyProfile}
            editNewLook={editNewLook}
            addNewLook={addNewLook}
            likeUpdate={likeUpdate}
            unlikeUpdate={unlikeUpdate}
            meta={meta}
            isLoading={this.state.isLoading}

          />
        );
      case 'wallet':
        return <View style={{ height: 200, width: 450, backgroundColor: 'yellow' }} />;
      case 'closet':
        return <View style={{ height: 200, width: 450, backgroundColor: 'blue' }} />;
      case 'settings':
        return <SettingsScreen navigation={navigation}/>;
      default:
        return <View style={{ height: 200, width: 450, backgroundColor: 'red' }} />
          ;
    }
  };

  _navigateToTab(tabIndex: number) {
    this.setState({ index: tabIndex });
  }

  _renderPager = props => (<TabViewPagerPan {...props} swipeEnabled animationEnabled={false} />);

  _configureTransition = () => null;

  _renderParallaxHeader = () => {
    const { balance, userData, isFollowing, userId, isMyProfile, stats, onStatClicked } = this.props;

    return (<ProfileScreenHeader
      balance={balance} profilePic={userData.avatar.url} name={userData.name} username={userData.username} stats={stats}
      isFollowing={isFollowing} userid={userId} isMyProfile={isMyProfile} onStatClicked={onStatClicked}
      onBalanceClicked={() => this.setState({ index: 1 })}
      onLooksClicked={() => this.setState({ index: 0 })}
    />);
  }

  _renderBody = () => (
    <View style={styles.container}>
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        configureTransition={this._configureTransition}
        renderScene={this._renderScene}
        renderPager={this._renderPager}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    </View>
  )

  _renderFixedHeader = () => (
    <TouchableHighlight
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      style={{ position: 'absolute', top: Platform.OS === 'ios' ? 36 : 12, left: 12.5 }}
      underlayColor={'transparent'}
      onPress={this._handleBackToFeedPress}>
      <Image
        style={{ width: 18, height: 18 }} resizeMode={'contain'}
        source={require('../../../images/icons/backArrow.png')} />
    </TouchableHighlight>
  )

  _handleBackToFeedPress = () => {
    this.props.logEvent('ProfileScreen', { name: 'Back to Feed click' });
    this.props.goBack();
  }

  _renderStickyHeader = () => {
    const { username } = this.props.userData;

    return (
      <View style={{ height: stickyHeaderHeight, justifyContent: 'center', alignItems: 'center' }}>
        <ScalableText
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 14,
            fontFamily: Fonts.regularFont,
            color: Colors.highlightColor,
            marginTop: Platform.OS === 'ios' ? 20 : 0,
          }}>
          {username}
        </ScalableText>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    backgroundColor: Colors.highlightColor,
    height: 2,
  },
  label: {
    fontSize: generateAdjustedSize(12),
    fontFamily: Fonts.regularFont,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    opacity: 1,
    height: 50,
    width: Dimensions.get('window').width / 4,
  },

});

export default ProfileScreen;
