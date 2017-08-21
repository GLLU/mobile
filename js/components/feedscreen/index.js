// @flow

import React, {Component} from 'react';
import {Dimensions, BackAndroid, View, StyleSheet, Modal, TouchableOpacity, Image, Animated} from 'react-native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';

import styles from './styles';
import MainBarView from './MainBarView';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import { setUser, getNotifications, loadCategories, loadOccasionTags} from '../../actions';
import {addNewLook} from '../../actions/uploadLookB'
import {toggleFiltersMenus, getColors, getFeaturedBrands} from '../../actions/filters';
import { getUserBalance } from '../../actions/wallet';
import asScreen from '../common/containers/Screen';
import Analytics from '../../lib/analytics/Analytics';
import {hideBodyTypeModal} from '../../actions/myBodyType';
import {noop} from 'lodash';
import {openCamera} from '../../lib/camera/CameraUtils';
import {formatLook} from '../../utils/UploadUtils';
import FeedTabs from './FeedTabs';
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../../actions/feed';

const cameraIcon = require('../../../images/icons/camera_green-circle.png');

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
      feedsRoute: {
        index: props.navigation.state.params ? props.navigation.state.params.resetToIndex : 1,
        routes: [
          {key: FEED_TYPE_FOLLOWING, title: 'Following'},
          {key: FEED_TYPE_BEST_MATCH, title: 'My Shape'},
          {key: FEED_TYPE_WHATS_HOT, title: "What's Hot"},
        ],
      },
    };
  }

  componentDidMount() {

    Analytics.setUser(this.props.user);

    const {gender} = this.props.user;
    this.props.loadCategories(gender);
    this.props.loadOccasionTags(gender);
    this.props.loadColors();
    this.props.loadBrands();
  }

  _onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  _onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  _onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  _onIds(device) {
    console.log('Device info: ', device);
  }


  componentWillMount() {

    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', this._onReceived);
    OneSignal.addEventListener('opened', this._onOpened);
    OneSignal.addEventListener('registered', this._onRegistered);
    OneSignal.addEventListener('ids', this._onIds);

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.photoModal) {
        this.setState({photoModal: false});
        return true;
      }
    });

    this.props.getNotifications(); // can stay here, still thinking about it
    this.props.getUserBalance(this.props.user.id);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('uploadLookScreen', {mode: 'create'});
    });
  }

  showBottomCameraButton(shouldShow) {
    if (shouldShow !== this.state.showBottomCamera) {
      this.setState({showBottomCamera: shouldShow});
      if (!shouldShow) {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: -80,
          }            // Configuration
        ).start();
      } else {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: 10,
          }            // Configuration
        ).start();
      }
    }
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = !this.state.searchStatus;
    this.setState({searchStatus});
  }

  _clearFilter() {
    this.setState({searchTerm: ''});
  }

  _handleSearchInput(term) {
    this.setState({searchTerm: term});
  }

  _onPickBodyType() {
    this.props.hideBodyTypeModal();
    this.props.navigateTo('myBodyMeasure');
  }

  closeModal() {
    this.props.logEvent('Feedscreen', {name: 'Hard close bodyType modal'});
    this.props.hideBodyTypeModal();
  }

  async uploadLook(pressedButton) {
    this.props.logEvent('Feedscreen', {name: 'user started uploading a look', origin: pressedButton});
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this.goToAddNewItem(file);
    } else {
      this.props.logEvent('Feedscreen', {name: 'User canceled the upload look', origin: 'camera'});
    }
  }

  renderBottomCamera() {
    return (
      <Animated.View style={{position: 'absolute', bottom: this.state.fadeAnimContentOnPress, alignSelf: 'center'}}>
        <TouchableOpacity transparent onPress={() => this.uploadLook('floating button')}>
          <Image source={cameraIcon} style={styles.btnImage}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  toggleFilterMenues(feedType: string) {
    this.props.toggleFiltersMenus(feedType);
  }

  _renderFeed() {
    const {reloading, clearedField, navigateTo, hasUserSize} = this.props;
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
    this.setState({feedsRoute: {...this.state.feedsRoute, index}});
  };

  render() {

    const { navigateTo, gotNewNotifications, user, balance, showWalletBadge } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.mainNavHeader]}>
          <MainBarView
            user={this.props.user} navigateTo={this.props.navigateTo} addNewItem={() =>this.uploadLook('menu camera')}
            gotNewNotifications={this.props.gotNewNotifications} searchStatus={this.state.searchStatus}
            handleSearchStatus={this._handleSearchStatus} balance={balance} showBalanceBadge={showWalletBadge}
            handleSearchInput={term => this._handleSearchInput(term)} clearFilter={this._clearFilter}
            handleIndexChange={this._handleTabsIndexChange}/>
        </View>
        {this._renderFeed()}
        {this.renderBottomCamera()}
        <Modal
          animationType="slide" visible={this.props.modalShowing}
          style={{justifyContent: 'flex-start', alignItems: 'center'}} onRequestClose={this.closeModal}>
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
