import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { Container, Content, View, Icon } from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import ItemsGallery  from './ItemsGallery';
import StatsView  from './StatsView';
import {
  getUser,
  getStats,
  getUserBodyType,
  addNewLook,
  navigateTo,
  getUserLooksData,
  getUserLooks,
  popRoute,
  pushRoute,
} from '../../actions';
import _ from 'lodash';
import SelectPhoto from '../common/SelectPhoto';
const profileBackground = require('../../../images/psbg.png');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');

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
    this._handleOpenPhotoModal = this._handleOpenPhotoModal.bind(this);
    this._handleClosePhotoModal = this._handleClosePhotoModal.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.state = {
      is_following: props.user.is_following,
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
    this.props.getUser(this.props.userId);
    this.props.getStats(this.props.userId);
  }

  handleSettingsPress() {
    this.logEvent('ProfileScreen', {name: 'Settings click'});
    this.props.navigateTo('settingsScreen', 'feedscreen');
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _renderleftBtn() {
    return this.props.isMyProfile ?
      <Image source={toFeedScreen} style={styles.toFeedScreenBtn}/>
      :
      <Icon style={styles.backBtn} name="ios-arrow-back"/>
  }

  _renderRightBtn() {
    return this.props.isMyProfile ?
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
    this.props.pushRoute({key: 'userLookScreen', optional: { id: this.props.userId }}, this.props.navigation.key);
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

  toggleFollow(is_following) {
    this.logEvent('ProfileScreen', {name: 'Follow click', is_following});
    this.setState({is_following: is_following}, ()  => {
      this.props.getStats(this.props.userId);  
    });
  }

  _renderStats() {

    if (this.props.stats.latest_looks && this.props.stats.user_id === this.props.userId) {
      return (
        <View>
          <ItemsGallery isMyProfile={this.props.isMyProfile}
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
      user: {id: this.props.userId, name:this.props.userData.name},
      isMyProfile: this.props.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleFollowersPress(stat) {
    this.logEvent('ProfileScreen', {name: 'Followers click'});
    this.props.navigateTo('followerScreen', 'profileScreen', {
      user: {id: this.props.userId, name:this.props.userData.name},
      isMyProfile: this.props.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleBackToFeedPress() {
    this.logEvent('ProfileScreen', {name: 'Back to Feed click'});
    this._PopRoute();
  }

  render() {
    const { isMyProfile, user } = this.props;
    console.log('profileScreen render', user);
    let about_me = user.about_me;
    let avatar = user.avatar;
    if (!_.isEmpty(user)) {
      let avatarUrl = avatar ? avatar.url : null;
      return (
        <Container>
          <Content>
          <Image source={profileBackground} style={styles.bg}>
            <LinearGradient
              colors={['#0C0C0C', '#4C4C4C']}
              style={[styles.linearGradient, {opacity: 0.7}]}
            />
            <View style={styles.header}>
              <TouchableOpacity transparent onPress={this.handleBackToFeedPress.bind(this)} style={styles.headerBtn}>
                { this._renderleftBtn() }
              </TouchableOpacity>
              { avatarUrl ?
                <ProfileView
                  profilePic={avatarUrl}
                  userid={this.props.userId}
                  name={user.name}
                  username={user.username}
                  isMyProfile={this.props.isMyProfile}
                  is_following={this.state.is_following}
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
    pushRoute:(route, key) => dispatch(pushRoute(route, key)),
    getUser: (id) => dispatch(getUser(id)),
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
    isMyProfile: state.user.id == state.profile.user.id,
    user: state.profile.user,
    stats: state.stats,
    hasUserSize,
    user_size: user_size,
    currLookScreenId: state.profile.currId,
  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
