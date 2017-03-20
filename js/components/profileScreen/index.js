import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { Container, Content, View, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import ItemsGallery  from './ItemsGallery';
import StatsView  from './StatsView';
import { getStats, getUserBodyType, addNewLook, navigateTo, getUserLooksData, getUserLooks } from '../../actions';
import _ from 'lodash';
import SelectPhoto from '../common/SelectPhoto';
const profileBackground = require('../../../images/psbg.png');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');
const {popRoute} = actions;

class ProfileScreen extends BasePage {
  static propTypes = {
    userData: React.PropTypes.object,
    navigation: React.PropTypes.object,
    myUser: React.PropTypes.object,
    stats: React.PropTypes.object,
    hasUserSize: React.PropTypes.bool,
    user_size: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    getUserBodyType: React.PropTypes.func,
    getStats: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    const isMyProfile = this.props.userData.id === this.props.myUser.id || this.props.userData.user_id === this.props.myUser.id;
    this._handleOpenPhotoModal = this._handleOpenPhotoModal.bind(this);
    this._handleClosePhotoModal = this._handleClosePhotoModal.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.state = {
      isMyProfile,
      isFollowing: this.props.userData.is_following,
      userId: isMyProfile ? this.props.myUser.id : this.props.userData.user_id,
      photoModal: false
    }
  }

  componentDidMount() {
    if (this.props.hasUserSize) {
      const data = {
        gender: this.props.myUser.gender,
        bodyType: this.props.myUser.user_size.body_type
      }
      this.props.getUserBodyType(data); //its here for performance, doesnt relate to this screen
    }
  }

  componentWillMount() {
    this.props.getStats(this.state.userId);
  }

  handleSettingsPress() {
    this.logEvent('ProfileScreen', {name: 'Settings click'});
    this.props.navigateTo('settingsScreen', 'feedscreen');
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _renderleftBtn() {
    return this.state.isMyProfile ?
      <Image source={toFeedScreen} style={styles.toFeedScreenBtn}/>
      :
      <Icon style={styles.backBtn} name="ios-arrow-back"/>
  }

  _renderRightBtn() {
    return this.state.isMyProfile ?
      <TouchableOpacity onPress={this.handleSettingsPress.bind(this)}>
        <Image source={toSettings} name="ios-arrow-back" style={styles.settingsBtn}/>
      </TouchableOpacity>
      :
      <Text style={styles.reportBtn}>REPORT</Text>
  }

  componentWillUnmount() {
    console.log('profile unmounted')
  }

  _handleItemPress(item) {
    this.props.navigateTo('looksScreen', 'feedscreen', item);
  }

  _handleItemsPress() {
    const {myUser, userData} = this.props;
    const user = this.state.isMyProfile ? myUser : userData;
    if (this.state.userId !== this.props.currLookScreenId) { //here for performance - relate to user looks screen
      const looksCall = {
        id: this.state.userId,
        page: 1,
      }
      const looksDataCall = {
        id: this.state.userId,
        name: user.name,
        looksCount: this.props.stats.looks_count,
        isMyProfile: this.state.isMyProfile
      }
      this.props.getUserLooks(looksCall);
      this.props.getUserLooksData(looksDataCall);
    }
    this.props.navigateTo('userLookScreen', 'feedscreen');
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.navigateTo('addItemScreen', 'profileScreen');
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
    this.logEvent('ProfileScreen', {name: 'Follow click', isFollowing});
    this.setState({isFollowing: isFollowing});
    this.props.getStats(this.state.userId);
  }

  _renderStats() {

    if (this.props.stats.latest_looks && this.props.stats.user_id === this.state.userId) {
      return (
        <View>
          <ItemsGallery isMyProfile={this.state.isMyProfile}
                        latest_looks={this.props.stats.latest_looks}
                        looksCount={this.props.stats.looks_count}
                        itemPress={(item) => this._handleItemPress(item) }
                        itemsPress={(item) => this._handleItemsPress(item) }
                        addNewItem={this._handleOpenPhotoModal}
          />
          <StatsView
            following={this.props.stats.following}
            followers={this.props.stats.followers}
            likes={this.props.stats.likes_count}
            onFollowersPress={this.handleFollowersPress.bind(this)}
            onFollowingPress={this.handleFollowingPress.bind(this)}
          />
        </View>
      )
    }
  }

  handleFollowingPress(stat) {
    this.logEvent('ProfileScreen', {name: 'Following click'});
    this.props.navigateTo('followScreen', 'profileScreen', {
      user: {id: this.state.userId, name:this.props.userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleFollowersPress(stat) {
    this.logEvent('ProfileScreen', {name: 'Followers click'});
    this.props.navigateTo('followerScreen', 'profileScreen', {
      user: {id: this.state.userId, name:this.props.userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleBackToFeedPress() {
    this.logEvent('ProfileScreen', {name: 'Back to Feed click'});
    this._PopRoute();
  }

  render() {
    const {isMyProfile} = this.state;
    const {myUser, userData} = this.props;
    const user = isMyProfile ? myUser : userData;
    let about_me = user.about_me;
    let avatar = user.avatar;
    if (!_.isEmpty(user)) {
      let avatarUrl = avatar ? avatar.url : null;
      return (
        <Container>
          <Content>
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
                /> : null }
              <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
                { this._renderRightBtn() }
              </TouchableOpacity>
            </View>
            <View style={styles.description}>
              <Text ellipsizeMode="middle" style={styles.descriptionText}>{about_me}</Text>
            </View>
            { this._renderStats() }
          </Image>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem} onRequestClose={this._handleClosePhotoModal}/>
          </Content>
        </Container>
      )
    }

    return null;
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getStats: (id) => dispatch(getStats(id)),
    getUserBodyType: (data) => dispatch(getUserBodyType(data)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    getUserLooksData: data => dispatch(getUserLooksData(data)),
    getUserLooks: data => dispatch(getUserLooks(data)),
  };
}

const mapStateToProps = state => {
  const hasUserSize = state.user.user_size != null && !_.isEmpty(state.user.user_size);
  const user_size = hasUserSize ? state.user.user_size : {};
  return {
    navigation: state.cardNavigation,
    myUser: state.user,
    stats: state.stats,
    hasUserSize,
    user_size: user_size,
    currLookScreenId: state.userLooks.currId
  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
