// @flow

import React, {Component} from 'react';
import {Dimensions, BackAndroid, View, StyleSheet, Modal, TouchableOpacity, Image, Animated, Text} from 'react-native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';

import styles from './styles';
import MainBarView from './MainBarView';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import { setUser, getNotifications, loadCategories, loadOccasionTags} from '../../actions';
import {addNewLook} from '../../actions/uploadLook'
import {gotNewNotifications, goToNotificationSubjectScreen, addUserNotification} from '../../actions/notifications';
import { showParisBottomMessage } from '../../actions/paris';
import { getColors, getFeaturedBrands} from '../../actions/filters';
import { getUserBalance } from '../../actions/wallet';
import asScreen from '../common/containers/Screen';
import Analytics from '../../lib/analytics/Analytics';
import {hideBodyTypeModal} from '../../actions/myBodyType';
import {noop} from 'lodash';
import {openCamera} from '../../lib/camera/CameraUtils';
import {formatLook} from '../../utils/UploadUtils';
import i18n from 'react-native-i18n';
import FeedTabs from './FeedTabs';
import * as userMapper from "../../mappers/userMapper";
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT, toggleFiltersMenus} from '../../actions/feed';
import { getSuggestions } from '../../actions/querySuggestions';

const cameraIcon = require('../../../images/icons/camera_green_bg.png');

class FeedPage extends Component {

  static propTypes = {
    user: React.PropTypes.object,
    balance: React.PropTypes.number,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    setUser: React.PropTypes.func,
    addNewLook: React.PropTypes.func,
    hideBodyTypeModal: React.PropTypes.func,
    toggleFiltersMenus: React.PropTypes.func,
    loadCategories: React.PropTypes.func,
    loadBrands: React.PropTypes.func,
    loadOccasionTags: React.PropTypes.func,
  }

  static defaultProps = {
    hideBodyTypeModal: noop,
    addNewLook: noop,
  }

  constructor(props) {
    super(props);
    this._handleSearchStatus = this._handleSearchStatus.bind(this);
    this._clearFilter = this._clearFilter.bind(this);
    this._onPickBodyType = this._onPickBodyType.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.uploadLook = this.uploadLook.bind(this);
    this.showBottomCameraButton = this.showBottomCameraButton.bind(this);
    this._renderFeed = this._renderFeed.bind(this);
    this._handleTabsIndexChange = this._handleTabsIndexChange.bind(this);
    this.toggleFilterMenues = this.toggleFilterMenues.bind(this);
    this.state = {
      name: '',
      searchTerm: '',
      searchStatus: false,
      contentHeight: null,
      showBottomCamera: true,
      fadeAnimContentOnPress: new Animated.Value(10),
      fadeAnimUploadHint: new Animated.Value(-160),
      feedsRoute: {
        index: props.navigation.state.params ? props.navigation.state.params.resetToIndex : 1,
        routes: [
          { key: FEED_TYPE_FOLLOWING, title: 'Following' },
          { key: FEED_TYPE_WHATS_HOT, title: "What's Hot" },
          { key: FEED_TYPE_BEST_MATCH, title: 'My Shape' }
        ],
      },
    };
  }

  componentDidMount() {
    Analytics.setUser(this.props.user);
    setTimeout(() => {
      this.props.getNotifications(); // can stay here, still thinking about it
      this.props.getUserBalance(this.props.user.id);
      this.props.loadCategories();
      this.props.loadOccasionTags();
      this.props.loadColors();
      this.props.loadBrands();
      this.props.getSuggestions();
    }, 1000);
    
  }

  _onReceived = (notification) => {
    this.props.onNotificationReceived(notification.payload.additionalData);
    if (notification.action_kind === 'Upload') {
      this.props.showParisBottomMessage(i18n.t('PARIS_VIDEO_LIVE'));
    }
  }

  _onOpened = (openResult) => {
    const isGroupedNotification = openResult.notification.groupedNotifications;
    const notification = openResult.notification.payload.additionalData;

    if (isGroupedNotification) {
      this.props.navigateTo('notificationsScreen');
    } else if (notification.action_kind === 'Follow') {
      this.props.navigateTo('profileScreen',  { userId: userMapper.map(notification.initiator).id });
    } else {
      this.props.goToNotificationSubjectScreen(notification.go_to_object.id, notification.id)
        .then(look => {
          this.props.navigateTo('lookScreenProfile', { lookId: look.id });
        });
    }
  }

  componentWillMount() {

    OneSignal.inFocusDisplaying(0);

    // Relevant only for IOS - shows a popup in case we need permissions.
    OneSignal.registerForPushNotifications();

    OneSignal.addEventListener('received', this._onReceived);
    OneSignal.addEventListener('opened', this._onOpened);

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.photoModal) {
        this.setState({ photoModal: false });
        return true;
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('registered');
    OneSignal.removeEventListener('ids');
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'create' });
    });
  }

  showBottomCameraButton(shouldShow) {
    if (shouldShow !== this.state.showBottomCamera) {
      this.setState({ showBottomCamera: shouldShow });
      if (!shouldShow) {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: -80,
          }            // Configuration
        ).start();
/*
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimUploadHint,    // The value to drive
          {
            toValue: -80,
          }            // Configuration
        ).start();

*/
      } else {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: 10,
          }            // Configuration
        ).start();

        Animated.timing(          // Uses easing functions
          this.state.fadeAnimUploadHint,    // The value to drive
          {
            toValue: 90,
            delay: 500,
          }            // Configuration
        ).start();

/*
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimUploadHint,    // The value to drive
          {
            toValue: -80,
            delay: 5000,
          }            // Configuration
        ).start();
*/

      }
    }
    else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimUploadHint,    // The value to drive
        {
          toValue: 90,
          delay: 500,
        }            // Configuration
      ).start();
    }
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = !this.state.searchStatus;
    this.setState({ searchStatus });
  }

  _clearFilter() {
    this.setState({ searchTerm: '' });
  }

  _handleSearchInput(term) {
    this.setState({ searchTerm: term });
  }

  _onPickBodyType() {
    this.props.hideBodyTypeModal();
    this.props.navigateTo('myBodyMeasure');
  }

  closeModal() {
    this.props.logEvent('Feedscreen', { name: 'Hard close bodyType modal' });
    this.props.hideBodyTypeModal();
  }

  async uploadLook(pressedButton) {
    this.props.logEvent('Feedscreen', { name: 'user started uploading a look', origin: pressedButton });
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this.goToAddNewItem(file);
    } else {
      this.props.logEvent('Feedscreen', { name: 'User canceled the upload look', origin: 'camera' });
    }
  }

  renderBottomCamera() {
    return (
      <Animated.View style={{ position: 'absolute', bottom: this.state.fadeAnimContentOnPress, alignSelf: 'center' }}>
        <TouchableOpacity transparent onPress={() => this.uploadLook('floating button')}>
          <Image source={cameraIcon} style={styles.btnImage}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  _renderUploadHint = () => {
    return (
      <Animated.View style={{ position: 'absolute', bottom: this.state.fadeAnimUploadHint, alignSelf: 'center' }}>
        <View style={styles.talkBubble}>
          <View style={styles.talkBubbleSquare}>
            <Text style={styles.cameraHintText}>What are you waiting for? Upload your first look and start making money!</Text>
          </View>
          <View style={styles.talkBubbleTriangle} />
        </View>
      </Animated.View>
    );
  }

  toggleFilterMenues(feedType: string) {
    this.props.toggleFiltersMenus(feedType);
  }

  _renderFeed() {
    const { reloading, clearedField, navigateTo, hasUserSize } = this.props;
    return (
      <FeedTabs
        reloading={reloading}
        clearedField={clearedField}
        navigateTo={navigateTo}
        showBottomCameraButton={this.showBottomCameraButton}
        feedsRoute={this.state.feedsRoute}
        handleIndexChange={this._handleTabsIndexChange}
        toggleFilterMenues={this.toggleFilterMenues}
        hasUserSize={hasUserSize}
      />
    );
  }

  _handleTabsIndexChange = (index) => {
    this.setState({ feedsRoute: { ...this.state.feedsRoute, index } });
  };

  render() {

    const { balance, showWalletBadge } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.mainNavHeader]}>
          <MainBarView
            user={this.props.user} navigateTo={this.props.navigateTo} addNewItem={() => this.uploadLook('menu camera')}
            gotNewNotifications={this.props.gotNewNotifications} searchStatus={this.state.searchStatus}
            handleSearchStatus={this._handleSearchStatus} balance={balance} showBalanceBadge={showWalletBadge}
            handleSearchInput={term => this._handleSearchInput(term)} clearFilter={this._clearFilter}
            handleIndexChange={this._handleTabsIndexChange}/>
        </View>
        {this._renderFeed()}
        {this.renderBottomCamera()}
{/*
        {this._renderUploadHint()}
*/}
        <Modal
          animationType="slide" visible={this.props.modalShowing}
          style={{ justifyContent: 'flex-start', alignItems: 'center' }} onRequestClose={this.closeModal}>
          <BodyTypePicker goBack={this.props.hideBodyTypeModal} onPick={this._onPickBodyType}/>
        </Modal>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    addNewLook: imagePath => dispatch(addNewLook(imagePath)),
    hideBodyTypeModal: () => dispatch(hideBodyTypeModal()),
    setUser: name => dispatch(setUser(name)),
    getNotifications: name => dispatch(getNotifications(name)),
    getUserBalance: (id) => dispatch(getUserBalance(id)),
    toggleFiltersMenus: feedType => dispatch(toggleFiltersMenus(feedType)),
    loadCategories: gender => dispatch(loadCategories(gender)),
    loadBrands: () => dispatch(getFeaturedBrands()),
    loadOccasionTags: gender => dispatch(loadOccasionTags(gender)),
    loadColors: () => dispatch(getColors()),
    onNotificationReceived: (notification) => {
      dispatch(gotNewNotifications());
      dispatch(addUserNotification(notification));
    },
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
    goToNotificationSubjectScreen: (objectId, notificationId) => dispatch(goToNotificationSubjectScreen(objectId, notificationId)),
    getSuggestions: () => dispatch(getSuggestions()),
  };
}

const mapStateToProps = state => (
  {
    hasUserSize: state.user.hasChoosenBodyShape,
    user: state.user,
    modalShowing: false,
    balance: state.wallet.balance,
    showWalletBadge: state.user.showWalletBadge,
    gotNewNotifications: state.notifications.newNotifications,
  });

export default connect(mapStateToProps, bindActions)(asScreen(FeedPage));
