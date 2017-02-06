import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { Container, Content, Header, Title, View, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import ItemsGallery  from './ItemsGallery';
import StatsView  from './StatsView';
import { getStats } from '../../actions/user'
const userBackground = require('../../../images/backgrounds/user-profile-background.jpeg');
const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');
const plus = require('../../../images/icons/plus.png');
const { popRoute } = actions;

class ProfileScreen extends Component {
  static propTypes = {
    userData: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      isMyProfile: this.props.userData.id === this.props.myUserId
    }
  }

  componentWillMount() {
    this.props.getStats(this.props.userData.id);
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  _goToEditProfileScreen(){
    console.log('go to edit profile screen');
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
    return (
      <View>
        <Image source={this.state.isMyProfile ? profileBackground : userBackground} style={styles.bg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, this.state.isMyProfile ? {opacity: 0.7} : {opacity: 0}]} />
          <View style={styles.header}>
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
            { this._renderleftBtn() }
            </TouchableOpacity>
            <ProfileView profilePic={this.props.userData.avatar.url}
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
            <Text ellipsizeMode="middle" style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. bal bal balkjdna sdckasm dlcjkasdackls mda;ksmxsxsxsxs mda;ksmxsxsxsxs mda;ksmxsxsxsxs </Text>
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
    getStats: (id) => dispatch(getStats(id))
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    myUserId: state.user.id,
    stats: state.stats,
  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
