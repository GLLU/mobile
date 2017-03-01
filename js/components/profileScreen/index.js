import React, {Component} from 'react';
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
import { getStats, getUserBodyType, addNewLook, navigateTo, getUserLooksData } from '../../actions';
import _ from 'lodash';
import SelectPhoto from '../feedscreen/SelectPhoto';
const userBackground = require('../../../images/epsbg.png');
const profileBackground = require('../../../images/psbg.png');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');
const { popRoute } = actions;

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
    const isMyProfile = this.props.userData.id === this.props.myUser.id
    this.state = {
      isMyProfile,
      userId: isMyProfile ? this.props.userData.id : this.props.userData.user_id,

      photoModal: false
    }
  }

  componentDidMount() {
    if(this.props.hasUserSize) {
      const data = {
        gender: this.props.myUser.gender,
        bodyType: this.props.myUser.user_size.body_type
      }
      this.props.getUserBodyType(data); //its here for performance, doesnt relate to this screen
    }
    if(this.state.userId !== this.props.currLookScreenId){ //here for performance - relate to user looks screen
      const looksDataCall = {
        id: this.state.userId,
        page: 1
      }
      this.props.getUserLooksData(looksDataCall);
    }
  }

  componentWillMount() {
    this.props.getStats(this.state.userId);
  }

  handleSettingsPress() {
    this.props.navigateTo('settingsScreen', 'feedscreen');
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _renderleftBtn() {
   return this.state.isMyProfile ?
     <Image source={toFeedScreen} style={styles.toFeedScreenBtn} />
     :
     <Icon style={styles.backBtn} name="ios-arrow-back" />
  }

  _renderRightBtn() {
   return this.state.isMyProfile ?
    <TouchableOpacity onPress={this.handleSettingsPress.bind(this)}>
      <Image source={toSettings} name="ios-arrow-back" style={styles.settingsBtn} />
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
    const userData = {
      id: this.state.userId,
      looksCount: this.props.stats.looks_count
    }
    this.props.navigateTo('userLookScreen', 'feedscreen', userData);
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.navigateTo('tagItemScreen', 'profileScreen');
      });
    })
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _renderStats() {

    if(this.props.stats.latest_looks && this.props.stats.user_id === this.state.userId) {
      return (
        <View>
          <ItemsGallery isMyProfile={this.state.isMyProfile}
                        latest_looks={this.props.stats.latest_looks}
                        looksCount={this.props.stats.looks_count}
                        itemPress={(item) => this._handleItemPress(item) }
                        itemsPress={(item) => this._handleItemsPress(item) }
                        addNewItem={() => this._handleOpenPhotoModal() }
          />
          <StatsView following={this.props.stats.following} followers={this.props.stats.followers} likes={this.props.stats.likes_count} />
        </View>
      )
    }
  }

  render() {
    const { isMyProfile } = this.state
    const { myUser, userData } = this.props;
    const user = isMyProfile ? myUser : userData;
    let about_me = user.about_me;
    let avatar = user.avatar;
    if (!_.isEmpty(user)) {
      let avatarUrl = avatar ? avatar.url : null;
      return (
        <Container>
            <Image source={this.state.isMyProfile ? profileBackground : userBackground} style={styles.bg}>
              <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, this.state.isMyProfile ? {opacity: 0.7} : {opacity: 0}]} />
              <View style={styles.header}>
                <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
                { this._renderleftBtn() }
                </TouchableOpacity>
                { avatarUrl ?
                <ProfileView profilePic={avatarUrl}
                             name={user.name}
                             username={user.username}
                             isMyProfile={this.state.isMyProfile}
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
            <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)} />
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
