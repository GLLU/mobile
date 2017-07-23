// @flow

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TabBarTop, TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar} from 'react-native-tab-view';
import I18n from 'react-native-i18n';

import ParallaxView from '../../utils/ParallaxView';
import ProfileScreenHeader from './ProfileScreenHeader';
import ScalableText, {generateAdjustedSize} from '../../utils/AdjustedFontSize';
import UserLooks from './UserLooks';
import WalletScreen from './WalletScreen';
import SettingsScreen from '../settingsScreen/SettingsContainer';
import Spinner from '../loaders/Spinner';

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
  logEvent: () => void,
  onFollowClicked: () => void
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
      isFollowing: props.isFollowing,
      userLooks: props.userLooks,
      stats: props.stats,
      userId: props.userId,
    };
  }

  componentWillMount() {
    const { getStats, userId, isMyProfile, getUserBalance, getUserLooks, getUserBodyType, hasUserSize, userSize, userGender } = this.props;

    getStats(userId);

    if (isMyProfile) {
      getUserBalance(userId);
    }

    if (hasUserSize) {
      const data = {
        gender: userGender,
        bodyType: userSize.body_type,
      };
      getUserBodyType(data);
    }

    this.setState({ isLoading: true }, () => {
      getUserLooks({ id: userId, all: isMyProfile }).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.userId === nextProps.currLookScreenId) {
      this.setState({
        userLooks: nextProps.userLooks,
        stats: this.state.userId === nextProps.stats.user_id ? nextProps.stats : this.state.stats,
      });
    }
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
          onScroll={this._handleScrollUserLooks}
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
      style={styles.tabbar}
    />
  );

  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(inputIndex => inputIndex === index ? Colors.secondaryColor : '#5a6f88');
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

  _renderLabel2 = (props) => {
    const inputRange = props.routes.map((x, i) => i);
    const outputRange = inputRange.map(inputIndex => inputIndex === props.index ? Colors.secondaryColor : '#5a6f88');
    const color =
      outputRange
    ;

    return (
      <Animated.Text numberOfLines={1} style={[styles.label, { color }]}>
        {props.routes[props.index].title}
      </Animated.Text>
    );
  };

  _renderScene = ({ route }) => {
    const { navigation, balance } = this.props;

    switch (route.key) {
      case 'looks':
        return this._renderUserLooks();
      case 'wallet':
        return <WalletScreen balance={balance}/>;
      case 'closet':
        return <View style={{ height: 200, width: 450, backgroundColor: 'blue' }}/>;
      case 'settings':
        return <SettingsScreen navigation={navigation}/>;
      default:
        return <View style={{ height: 200, width: 450, backgroundColor: 'red' }}/>
          ;
    }
  };

  _navigateToTab(tabIndex: number) {
    this.setState({ index: tabIndex });
  }

  _handleScrollUserLooks = (event: any) => {
    if (this.state.index !== 0) {
      return;
    }

    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const currentScroll = event.nativeEvent.contentOffset.y;
    if (currentScroll + layoutMeasurementHeight > contentSizeHeight - 250) {
      this.contentHeight = contentSizeHeight;
      if (!this.state.loadingMore) {
        this._loadMoreUserLooks();
      }
    }

    this.currPosition = event.nativeEvent.contentOffset.y;
  }

  _renderScrollableComponent = () => <ScrollView
    scrollEventThrottle={100}
    onScroll={this._handleScrollUserLooks}
    style={{ backgroundColor: 'purple' }}
    pagingEnabled/>

  _loadMoreUserLooks() {
    if (this.state.loadingMore) {
      console.log('already isLoading');
      return;
    }
    const data = {
      id: this.state.userId,
      all: this.state.isMyProfile,
    };
    const { meta: { total_count }, query } = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;
    if (pageSize * pageNumber < total_count) {
      // if (pageSize * pageNumber < total_count) {
      this.setState({ loadingMore: true }, () => {
        this.props.loadMoreUserLooks(data).then(() => {
            this.setState({ loadingMore: false });
          }
        ).catch((err) => {
          console.log('error', err);
          this.setState({ loadingMore: false });
        });
      });
    } else {
      this.setState({ noMoreData: true });
      console.log('end of LooksScreen');
    }
  }

  _renderLoadMore() {
    return (
      <View style={styles.loader}>
        {(() => {
          if (this.state.noMoreData) {
            return <Text style={{ color: 'rgb(230,230,230)' }}>No additional looks yet</Text>;
          }
          if (this.state.isLoading) {
            return <Spinner color="rgb(230,230,230)"/>;
          }
          if (this.state.loadingMore) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')}/>;
          }
          return null;
        })()}
      </View>);
  }

  _renderUserLooks = () => {
    const { userId, navigateTo, isMyProfile, meta, editNewLook, addNewLook, likeUpdate, unlikeUpdate } = this.props;
    const { stats, userLooks } = this.state;
    return (
      <View>
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
          isLoading={this.state.isLoading}/>
        {this._renderLoadMore()}
      </View>
    );
  }

  _renderPager = props => (
    <TabViewPagerScroll {...props} onScroll={this._handleScrollUserLooks} swipeEnabled animationEnabled={false}/>
  );

  _configureTransition = () => null;

  _renderParallaxHeader = () => {
    const { balance, userData, userId, isMyProfile, onStatClicked, onFollowClicked, onProfileEdit } = this.props;
    const { isFollowing, stats } = this.state;

    return (

      <View style={{ marginTop: 20 }}>
        <ProfileScreenHeader
          balance={balance} profilePic={userData.avatar.url} name={userData.name} username={userData.username}
          stats={stats} onProfileEdit={onProfileEdit}
          isFollowing={isFollowing} userid={userId} isMyProfile={isMyProfile} onStatClicked={onStatClicked}
          onFollowClicked={() => {
            onFollowClicked(userId, isFollowing);
            this.setState({ isFollowing: !isFollowing });
          }}
          onBalanceClicked={() => this.setState({ index: 1 })}
          onLooksClicked={() => this.setState({ index: 0 })}
        />
      </View>
    );
  }

  _renderBody = () => {
    const { isMyProfile } = this.props;

    return (<View style={styles.container}>

        {!isMyProfile ? this._renderUserLooks() :
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            configureTransition={this._configureTransition}
            renderScene={this._renderScene}
            renderPager={this._renderPager}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
          />
        }
      </View>
    );
  };

  _renderFixedHeader = () => {
    const { onProfileEdit, isMyProfile } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          height: stickyHeaderHeight,
          top: Platform.OS === 'ios' ? 32 : 12,
          left: 12.5,
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          underlayColor={'transparent'}
          onPress={this._handleBackToFeedPress}>
          <Image
            style={{ width: 18, height: 18 }} resizeMode={'contain'}
            source={require('../../../images/icons/backArrow.png')}/>
        </TouchableOpacity>

        {!isMyProfile ? null :
          <TouchableOpacity onPress={onProfileEdit} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Image
              source={require('../../../images/icons/edit.png')}
              style={{ width: 18, height: 18, right: 18.5 }}
              resizeMode={'contain'}/>
          </TouchableOpacity>
        }

      </View>
    );
  };

  _handleBackToFeedPress = () => {
    this.props.logEvent('ProfileScreen', { name: 'Back to Feed click' });
    this.props.goBack();
  }

  _renderStickyHeader = () => {
    const { username } = this.props.userData;

    return (
      <View style={{ height: stickyHeaderHeight * 2 }}>
        <ScalableText
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 14,
            height: 20,
            fontFamily: Fonts.regularFont,
            color: Colors.secondaryColor,
            marginTop: Platform.OS === 'ios' ? 32 : 12,
          }}>
          {username}
        </ScalableText>


        {/*
         <View style={{ justifyContent: 'center', marginTop: 8, height: 50, backgroundColor: 'white' }}>
         <View style={{ flexDirection: 'row' }}>
         <View style={{height:50, justifyContent: 'center'}}>
         <Animated.Text numberOfLines={1}
         style={[styles.label, { color: this.state.index === 0 ? Colors.highlightColor : '#5a6f88'}, styles.headerTab]}>
         {this.state.routes[0].title}
         </Animated.Text>
         <View style={[styles.indicator, {    position: 'absolute',
         left: 0,
         bottom: 0,
         right: 0,
         height: 2,
         }]} />
         </View>
         <Animated.Text numberOfLines={1}
         style={[styles.label, { color: this.state.index === 1 ? Colors.highlightColor : '#5a6f88' }, styles.headerTab]}>
         {this.state.routes[1].title}
         </Animated.Text>
         <Animated.Text numberOfLines={1}
         style={[styles.label, { color: this.state.index === 2 ? Colors.highlightColor : '#5a6f88' }, styles.headerTab]}>
         {this.state.routes[2].title}
         </Animated.Text>
         <Animated.Text numberOfLines={1}
         style={[styles.label, { color: this.state.index === 3 ? Colors.highlightColor : '#5a6f88' }, styles.headerTab]}>
         {this.state.routes[3].title}
         </Animated.Text>
         </View>
         </View>
         */}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    backgroundColor: Colors.secondaryColor,
    height: 2,
  },
  label: {
    fontSize: generateAdjustedSize(12),
    fontFamily: Fonts.regularFont,
    textAlign: 'center',
    alignSelf: 'center',
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    opacity: 1,
    height: 50,
    width: Dimensions.get('window').width / 4,
  },
  headerTab: {
    opacity: 1,
    width: Dimensions.get('window').width / 4,
  },

});

export default ProfileScreen;
