import React from 'react';
import BasePage from '../common/base/BasePage';
import { Image, TouchableOpacity, Text, ScrollView,View, StyleSheet } from 'react-native';
import styles from './styles';
import { Container, Content,  Icon } from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import StatsView  from './StatsView';
import { getStats, getUserBodyType, addNewLook, getUserLooksData, getUserLooks, showParisBottomMessage } from '../../actions';
import _ from 'lodash';
import UserLooks from './UserLooks';
import SelectPhoto from '../common/SelectPhoto';
import { editNewLook } from "../../actions/uploadLook";
import Spinner from "../loaders/Spinner";
const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');
const toFeedScreen = require('../../../images/icons/feed.png');
const toSettings = require('../../../images/icons/settings.png');
const LOADER_HEIGHT = 30;

class ProfileScreen extends BasePage {
  static propTypes = {
    userData: React.PropTypes.object,
    navigation: React.PropTypes.object,
    myUser: React.PropTypes.object,
    stats: React.PropTypes.object,
    hasUserSize: React.PropTypes.bool,
    user_size: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    getUserBodyType: React.PropTypes.func,
    getStats: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    const userData = props.navigation.state.params;
    const isMyProfile = userData.id === this.props.myUser.id || userData.user_id === this.props.myUser.id;
    const currUserId = isMyProfile ? props.myUser.id : userData.user_id
    this._handleOpenPhotoModal = this._handleOpenPhotoModal.bind(this);
    this._handleClosePhotoModal = this._handleClosePhotoModal.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.handleFollowersPress = this.handleFollowersPress.bind(this);
    this.handleFollowingPress = this.handleFollowingPress.bind(this);
    this.handleBalancePress = this.handleBalancePress.bind(this);
    this.state = {
      isMyProfile,
      userId: currUserId,
      noMoreData: false,
      isFollowing: userData.is_following,
      photoModal: false,
      isLoadingLooks: true,
      stats: currUserId === props.stats.user_id ? props.stats : {},
      userLooks: currUserId === props.currLookScreenId ? props.userLooks : []

    }
    this.loadMoreAsync = _.debounce(this.loadMoreAsync, 500)
    this.pagination = 1
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.stats.user_id === this.state.userId && nextProps.stats !== this.state.stats){
      this.setState({stats: nextProps.stats})
    }
    if(nextProps.currLookScreenId === this.state.userId && nextProps.userLooks !== this.state.userLooks){
      this.setState({userLooks: nextProps.userLooks})
    }
  }

  componentDidMount() {
    if (this.props.hasUserSize) {
      const data = {
        gender: this.props.myUser.gender,
        bodyType: this.props.myUser.user_size.body_type
      }
      this.props.getUserBodyType(data);
    }
  }

  componentWillMount() {
    const {myUser} = this.props;
    const userData = this.props.navigation.state.params;
    const user = this.state.isMyProfile ? myUser : userData;
    if (this.state.userId !== this.props.currLookScreenId) {
      const looksCall = {
        id: this.state.userId,
        page: 1,
        all: this.state.isMyProfile
      }
      const looksDataCall = {
        id: this.state.userId,
        name: user.name,
        looksCount: this.state.stats.looks_count,
        isMyProfile: this.state.isMyProfile
      }
      this.props.getUserLooks(looksCall);
      this.props.getUserLooksData(looksDataCall);
    }
    this.props.getStats(this.state.userId);
  }

  handleSettingsPress() {
    this.logEvent('ProfileScreen', {name: 'Settings click'});
    this.navigateTo('settingsScreen');
  }

  _renderleftBtn() {
    return this.state.isMyProfile ?
      <Image source={toFeedScreen} style={styles.toFeedScreenBtn}/>
      :
      <Icon style={StyleSheet.flatten(styles.backBtn)} name="ios-arrow-back"/>
  }

  _renderRightBtn() {
    return this.state.isMyProfile ?
      <TouchableOpacity onPress={this.handleSettingsPress.bind(this)}>
        <Image source={toSettings} name="ios-arrow-back" style={styles.settingsBtn}/>
      </TouchableOpacity>
      :
      <Text style={styles.reportBtn}>REPORT</Text>
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.navigateTo('addItemScreen');
      });
    })
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _handleClosePhotoModal() {
    this.setState({photoModal: false});
  }

  toggleFollow(isFollowing) {
    this.logEvent('ProfileScreen', {name: 'Follow click', isFollowing:`${isFollowing}`});
    this.setState({isFollowing: isFollowing});
    this.props.getStats(this.state.userId);
  }

  _renderStats() {
    const { following, followers, likes_count} = this.state.stats
    const { isMyProfile } = this.state
    if(!_.isEmpty(this.state.stats)) {
      return (
        <View>
          <StatsView
            following={ following }
            followers={ followers }
            likes={ likes_count }
            isMyProfile={ isMyProfile }
            onFollowersPress={this.handleFollowersPress}
            onFollowingPress={this.handleFollowingPress}
            handleBalancePress = {this.handleBalancePress}
          />
        </View>
      )
    }


  }

  handleFollowingPress(stat) {
    this.logEvent('ProfileScreen', {name: 'Following click'});
    const userData = this.props.navigation.state.params;
    this.navigateTo('followScreen', {
      user: {id: this.state.userId, name:userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleFollowersPress(stat) {
    this.logEvent('ProfileScreen', {name: 'Followers click'});
    const userData = this.props.navigation.state.params;
    this.navigateTo('followerScreen', {
      user: {id: this.state.userId, name:userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleUserLooksScroll(event) {
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const currentScroll = event.nativeEvent.contentOffset.y
    const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
    if (compare <= LOADER_HEIGHT && !this.props.isLoading) {
      this.loadMoreAsync()
    }
  }

  loadMoreAsync() {
    this.pagination+=1
    let data = {
      id: this.state.userId,
      page: this.pagination,
      all: this.state.isMyProfile
    }
    this.props.getUserLooks(data)
  }

  handleBackToFeedPress() {
    this.logEvent('ProfileScreen', {name: 'Back to Feed click'});
    this.goBack();
  }

  handleBalancePress() {
    this.logEvent('ProfileScreen', {name: 'Wallet Pressed'});
    this.props.showParisBottomMessage(`Hey, you can withdraw the reward once you reach at least US$50.00`);
  }

  render() {
    const {isMyProfile} = this.state;
    const userData = this.props.navigation.state.params;
    const {myUser} = this.props;
    const user = isMyProfile ? myUser : userData;
    let about_me = user.about_me;
    let avatar = user.avatar;
    if (!_.isEmpty(user)) {
      let avatarUrl = avatar ? avatar.url : null;
      return (
        <Container>
            <ScrollView scrollEventThrottle={100}
                        onScroll={this.handleUserLooksScroll.bind(this)}
                        pagingEnabled={false}>
              <Image source={profileBackground} style={styles.bg}>
                <LinearGradient colors={['#0C0C0C', '#4C4C4C']}
                                style={[styles.linearGradient, {opacity: 0.7}]}/>
                <View style={styles.header}>
                  <TouchableOpacity transparent onPress={this.handleBackToFeedPress.bind(this)} style={styles.headerBtn}>
                    { this._renderleftBtn() }
                  </TouchableOpacity>
                  { avatarUrl ?
                    <ProfileView profilePic={avatarUrl}
                                 userid={this.state.userId}
                                 name={user.name}
                                 username={user.username}
                                 isMyProfile={this.state.isMyProfile}
                                 isFollowing={this.state.isFollowing}
                                 onFollowPress={this.toggleFollow.bind(this)}
                                 navigateTo = {this.navigateTo}
                    /> : null }
                  <TouchableOpacity transparent onPress={() => this.goBack()} style={styles.headerBtn}>
                    { this._renderRightBtn() }
                  </TouchableOpacity>
                </View>
                <View style={styles.description}>
                  <Text ellipsizeMode="middle" style={styles.descriptionText}>{about_me}</Text>
                </View>
                { this._renderStats() }
              </Image>
              <UserLooks
                myUserId={this.props.myUser.id}
                currLookScreenId={this.state.userLooksUserId}
                userLooks={this.state.userLooks}
                navigateTo={this.navigateTo}
                isMyProfile={this.state.isMyProfile}
                editNewLook = {this.props.editNewLook}
                addNewLook = {this.props.addNewLook}
                navigation={this.props.cardNavigation}
              />
            </ScrollView>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem} onRequestClose={this._handleClosePhotoModal}/>
        </Container>
      )
    }

    return null;
  }
}

function bindAction(dispatch) {
  return {
    getStats: (id) => dispatch(getStats(id)),
    getUserBodyType: (data) => dispatch(getUserBodyType(data)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    editNewLook: (id) => dispatch(editNewLook(id)),
    getUserLooksData: data => dispatch(getUserLooksData(data)),
    getUserLooks: data => dispatch(getUserLooks(data)),
    showParisBottomMessage: (message) => dispatch(showParisBottomMessage(message)),
  };
}

const mapStateToProps = state => {
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const user_size = hasUserSize ? state.user.user_size : {};
  return {
    myUser: state.user,
    stats: state.stats,
    hasUserSize,
    user_size: user_size,
    currLookScreenId: state.userLooks.currId,
    isLoading: state.loader.loading,
    userLooks: state.userLooks.userLooksData,
    userLooksUserId: state.userLooks.currId,
    cardNavigation: state.cardNavigation,

  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
