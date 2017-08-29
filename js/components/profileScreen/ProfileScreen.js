// @flow

import React, { Component } from 'react';
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
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { TabBarTop, TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar } from 'react-native-tab-view';
import I18n from 'react-native-i18n';

import ParallaxView from '../../utils/ParallaxView';
import ProfileScreenHeader from './ProfileScreenHeader';
import WalletWalkthrough from './WalletWalkthrough';
import EmptyStateScreen from '../common/EmptyStateScreen';
import ScalableText, { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import UserLooks from './UserLooks';
import WalletScreen from './WalletScreen';
import SettingsScreen from '../settingsScreen/SettingsContainer';
import Spinner from '../loaders/Spinner';
import { openCamera } from '../../lib/camera/CameraUtils';
import { formatLook } from '../../utils/UploadUtils';
import ImageView from '../common/ImageView';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

const { height } = Dimensions.get('window');
const parallaxHeaderHeight = 270;
const stickyHeaderHeight = Platform.OS === 'ios' ? 66 : 46;

type Props = {
  number: string,
  text: string,
  getStats: () => void,
  userId: number,
  isMyProfile: boolean,
  getUserBodyType: () => void,
  hasUserSize: boolean,
  userSize: any,
  userGender: string,
  hideWalletBadge: () => void,
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

    this._handleNewPost = this._handleNewPost.bind(this);

    this.state = {
      modalVisible: false,
      showWalletWizard: false,
      showProfileImage: false,
      index: 1,
      routes: [
        { key: 'looks', title: I18n.t('LOOKS'), index: 0 },
        { key: 'wallet', title: I18n.t('WALLET'), index: 1 },
        { key: 'closet', title: I18n.t('CLOSET'), index: 2 },
        { key: 'settings', title: I18n.t('SETTINGS'), index: 3 },
      ],
      isFollowing: props.isFollowing,
      userLooks: props.userLooks,
      stats: props.userId === props.currLookScreenId ? props.stats : {},
      userId: props.userId,
      currentScrollPosition: 0,
    };
    this.currPosition = 0;
  }

  componentWillMount() {
    const { getStats, userId, isMyProfile, getUserBalance, getUserLooks, getUserBodyType, hasUserSize, userSize, userGender, hideWalletBadge } = this.props;

    hideWalletBadge();

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

  componentDidMount() {
    const that = this;
    setInterval(() => {
      that.handleScrollPositionForVideo();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.userId === nextProps.currLookScreenId) {
      this.setState({
        userLooks: nextProps.userLooks,
        stats: this.state.userId === nextProps.stats.user_id ? nextProps.stats : this.state.stats,
      });
    }
  }

  handleScrollPositionForVideo() {
    if (this.state.currentScrollPosition !== this.currPosition) {
      this.setState({ currentScrollPosition: this.currPosition });
    }
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
    const { navigation, balance, onProfileEdit } = this.props;

    switch (route.key) {
      case 'looks':
        return this._renderUserLooks();
      case 'wallet':
        return (<WalletScreen
          balance={balance} onWithdrawPressed={this._handleWithdraw}
          onShowWalletWizard={() => this.setState({ showWalletWizard: true })}
          onAddNewLook={() => this._handleNewPost('wallet')} />);
      case 'closet':
        return this._renderUserLooks();
      case 'settings':
        return <SettingsScreen navigation={navigation} onProfileEdit={onProfileEdit} />;
      default:
        return <View style={{ height: 200, width: 450, backgroundColor: 'red' }} />
          ;
    }
  };

  async _handleNewPost(buttonPressed) {
    this.props.logEvent('profileScreen', { name: 'user started uploading a look', origin: buttonPressed });
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this.props.addNewLook(file).then(() => {
        this.props.navigateTo('uploadLookScreen', { mode: 'create' });
      });
    } else {
      this.props.logEvent('profileScreen', { name: 'User canceled the upload look', origin: 'camera' });
    }
  }

  _handleWithdraw = (balance) => {
    const { showParisBottomMessage } = this.props;
    showParisBottomMessage(balance);
  }

  _navigateToTab(tabIndex: number) {
    this.setState({ index: tabIndex });
  }

  _handleScrollUserLooks = (event: any) => {
    if (this.state.index !== 0) {
      return;
    }

    event.persist();

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
    pagingEnabled />

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
            return <Spinner color="rgb(230,230,230)" />;
          }
          if (this.state.loadingMore) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')} />;
          }
          return null;
        })()}
      </View>);
  }

  _renderUserLooks = () => {
    const { userId, navigateToLooksScreen, isMyProfile, meta, editNewLook, addNewLook, likeUpdate, unlikeUpdate, navigateTo } = this.props;
    const { userLooks, currentScrollPosition } = this.state;
    const emptyStateTitle = isMyProfile ? I18n.t('ME_NO_LOOKS_UPLOADED_TITLE') : I18n.t('NO_LOOKS_UPLOADED_TITLE');
    const emptyStateSubtitle = isMyProfile ? I18n.t('ME_NO_LOOKS_UPLOADED_LEGEND') : null;
    const emptyStateButtonText = isMyProfile ? I18n.t('POST_NOW') : null;

    if ((!userLooks || userLooks.length === 0) && !this.state.isLoading) {
      return (<EmptyStateScreen
        title={emptyStateTitle} subtitle={emptyStateSubtitle}
        icon={require('../../../images/emptyStates/photo-camera.png')} buttonText={emptyStateButtonText}
        onButtonClicked={() => this._handleNewPost('userLooks')} />);
    }

    return (
      <View>
        <UserLooks
          currentScrollPosition={currentScrollPosition}
          navigateTo={navigateTo}
          myUserId={userId}
          userLooks={userLooks}
          navigateToLooksScreen={navigateToLooksScreen}
          isMyProfile={isMyProfile}
          editNewLook={editNewLook}
          addNewLook={addNewLook}
          likeUpdate={likeUpdate}
          unlikeUpdate={unlikeUpdate}
          meta={meta}
          isLoading={this.state.isLoading} />
        {this._renderLoadMore()}
      </View>
    );
  }

  _renderPager = props => (
    <TabViewPagerScroll
      {...props} style={this.state.index !== 1 ? { height } : null}
      onScroll={this._handleScrollUserLooks} swipeEnabled animationEnabled={false} />
  );

  _configureTransition = () => null;

  _renderParallaxHeader = () => {
    const { balance, userData, userId, isMyProfile, onStatClicked, onFollowClicked, onProfileEdit, changeUserAvatar } = this.props;
    const { isFollowing, stats } = this.state;

    return (

      <View>
        <ProfileScreenHeader
          balance={balance} profilePic={userData.avatar.url} name={userData.name} username={userData.username}
          userId={userData.id} changeUserAvatar={changeUserAvatar}
          stats={stats} onProfileEdit={onProfileEdit}
          onProfileImageClicked={() => {
            console.log('here');
            this.setState({ showProfileImage: true });
          }}
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
        style={[styles.container, this.state.index !== 0 ? { height } : null]}
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
            source={require('../../../images/icons/backArrow.png')} />
        </TouchableOpacity>

        {!isMyProfile ? this._renderMenu() :
        <TouchableOpacity onPress={onProfileEdit} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Image
            source={require('../../../images/icons/edit.png')}
            style={{ width: 18, height: 18, marginRight: 18.5 }}
            resizeMode={'contain'} />
        </TouchableOpacity>
        }

      </View>
    );
  };

  _renderWalletWizardModal = () => (
    <Modal
      visible={this.state.showWalletWizard} transparent style={{ flex: 1 }} animationType={'fade'}
      onRequestClose={() => this.setState({ modalVisible: false })}>
      <WalletWalkthrough onClose={() => this.setState({ showWalletWizard: false })} />
    </Modal>
  )

  _renderMenu = () => (
    <TouchableOpacity
      onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
      <Image
        source={require('../../../images/icons/more.png')}
        style={{ width: 18, height: 18, marginRight: 18.5 }}
        resizeMode={'contain'} />
      {this._renderModal()}
    </TouchableOpacity>
  )

  _renderModal = () => {
    const { blockUser, userId } = this.props;
    return (
      <Modal
        visible={this.state.modalVisible} transparent style={{ flex: 1 }}
        onRequestClose={() => this.setState({ modalVisible: false })}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ modalVisible: false })}>
          <View style={{ backgroundColor: 'white', position: 'absolute', right: 32, top: 48 }}>
            <TouchableOpacity onPress={() => blockUser(userId)}>
              <Text style={styles.modalOption}>Block User</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

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
      </View>
    );
  }

  _renderFullSizeImage = () => (
    <Modal
      visible={this.state.showProfileImage} transparent style={{ flex: 1 }} animationType={'fade'}
      onRequestClose={() => this.setState({ showProfileImage: false })}>
      <ImageView
        imagePath={this.props.userData.avatar.url}
        onClose={() => this.setState({ showProfileImage: false })} />
    </Modal>
      )

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

        {this._renderWalletWizardModal()}
        {this._renderFullSizeImage()}

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
  modalOption: {
    fontSize: 12,
    padding: 10,
  },

});

export default ProfileScreen;
