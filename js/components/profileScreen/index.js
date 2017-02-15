import React, {Component} from 'react';
import { Image, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { View, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import ItemsGallery  from './ItemsGallery';
import StatsView  from './StatsView';
import { getStats, getUserBodyType } from '../../actions';
import _ from 'lodash';
const userBackground = require('../../../images/backgrounds/user-profile-background.jpeg');
const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');
const { popRoute } = actions;

class ProfileScreen extends Component {
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
    this.state = {
      isMyProfile: this.props.userData.id === this.props.myUser.id,
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
  }

  componentWillMount() {
    this.props.getStats(this.props.userData.id);
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  _goToEditProfileScreen(){
    this.props.navigateTo('editProfileScreen', 'profileScreen', this.props.user);
  }

  _renderleftBtn() {
   return this.state.isMyProfile ?
     <Image source={toFeedScreen} style={styles.toFeedScreenBtn} />
     :
     <Icon style={styles.backBtn} name="ios-arrow-back" />
  }
  _renderRightBtn() {
   return this.state.isMyProfile ?
     <Image source={toSettings} name="ios-arrow-back" style={styles.settingsBtn} />
     :
     <Text style={styles.reportBtn}>REPORT</Text>
  }

  _handleItemPress(item) {
    this.props.navigateTo('itemScreen', 'feedscreen', item);
  }

  _renderStats() {
    if(this.props.stats.latest_looks && this.props.stats.user_id === this.props.userData.id) {
      return (
        <View>
          <ItemsGallery isMyProfile={this.state.isMyProfile} latest_looks={this.props.stats.latest_looks} looksCount={this.props.stats.looks_count} itemPress={(item) => this._handleItemPress(item) }/>
          <StatsView following={this.props.stats.following} followers={this.props.stats.followers} likes={this.props.stats.likes_count} />
        </View>
      )
    }
  }

  render() {
    const { isMyProfile } = this.state
    let about_me = isMyProfile ? this.props.myUser.about_me : this.props.userData.about_me
    let avatarUrl = isMyProfile ? this.props.myUser.avatar.url : this.props.userData.avatar.url
    return (
      <View>
        <Image source={this.state.isMyProfile ? profileBackground : userBackground} style={styles.bg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, this.state.isMyProfile ? {opacity: 0.7} : {opacity: 0}]} />
          <View style={styles.header}>
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
            { this._renderleftBtn() }
            </TouchableOpacity>
            <ProfileView profilePic={avatarUrl}
                         name={this.props.userData.name}
                         username={this.props.userData.username}
                         onPress={() => this._goToEditProfileScreen()}
                         isMyProfile={this.state.isMyProfile}
            />
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
              { this._renderRightBtn() }
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <Text ellipsizeMode="middle" style={styles.descriptionText}>{about_me}</Text>
          </View>
          { this._renderStats() }
        </Image>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getStats: (id) => dispatch(getStats(id)),
    getUserBodyType: (data) => dispatch(getUserBodyType(data)),

  };
}

const mapStateToProps = state => {
  const hasUserSize = state.user.user_size != null && !_.isEmpty(state.user.user_size);
  const user_size = hasUserSize ? state.user.user_size : '';
  return {
    navigation: state.cardNavigation,
    myUser: state.user,
    stats: state.stats,
    hasUserSize,
    user_size: user_size,

  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
