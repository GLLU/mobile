import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { Container, Content, Header, Title, View, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import { getStats } from '../../actions/user'
const userbBackground = require('../../../images/backgrounds/user-profile-background.jpeg');
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
    console.log('props',this.props)
    console.log('state',this.state)
    console.log('idddd',this.props.userData.id)
    this.props.getStats(1);
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  _tempBtn(){
    console.log('_tempBtn was pressed');
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

  componentWillReceiveProps() {
    //this.getGalleryItems();
  }

  getGalleryItems() {
    let limiter = this.state.isMyProfile ? 3 : 4;
     return (
       this.props.stats.latest_looks.map((look, index) => {
         let thumbImage = _.find(look.cover, image => image.version == 'thumb');
         if(index < limiter){
           return (
             <TouchableOpacity>
               <Image key={index} source={{uri: thumbImage.url}} style={styles.itemPic} />
             </TouchableOpacity>
           )
         }
         return  this.state.isMyProfile ?
           (
             <TouchableOpacity key={index}  style={styles.addItemContainer}>
               <Image source={require('../../../images/icons/plus.png')} style={[styles.itemPic, styles.addItem]} />
             </TouchableOpacity>
           )

           :
           null
      })
     )
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={userbBackground} style={styles.bg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, {opacity: 0}]} />
          <View style={styles.header}>
            <TouchableOpacity transparent onPress={() => this._tempPopRoute()} style={styles.headerBtn}>
            { this._renderleftBtn() }
            </TouchableOpacity>
            <ProfileView profilePic={this.props.userData.avatar.url}
                         name={this.props.userData.name}
                         username={this.props.userData.username}
                         onPress={() => this._tempBtn()}
                         isMyProfile={this.state.isMyProfile}
            />
            <TouchableOpacity transparent onPress={() => this._tempPopRoute()} style={styles.headerBtn}>
              { this._renderRightBtn() }
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <Text ellipsizeMode="middle" style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. bal bal balkjdna sdckasm dlcjkasdackls mda;ksmxsxsxsxs mda;ksmxsxsxsxs mda;ksmxsxsxsxs </Text>
          </View>
          <View style={styles.itemsContainer}>
            <View style={styles.itemsSeparator}>
              <View style={styles.itemsTotal}>
                <Text style={[styles.text, styles.number]}>{this.props.stats.looks_count}</Text>
                <Text style={styles.text}>Items</Text>
              </View>
              <View style={styles.itemsRow}>

                {/*<Image source={{uri: this.props.userData.avatar.url}} style={styles.itemPic} />*/}
                {/*<Image source={{uri: this.props.userData.avatar.url}} style={styles.itemPic} />*/}
                {/*<Image source={{uri: this.props.userData.avatar.url}} style={styles.itemPic} />*/}
                {this.props.stats.latest_looks ?
                  this.getGalleryItems()
                  :
                  null}
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsTotal}>
              <Text style={[styles.text, styles.number]}>{this.props.stats.following}</Text>
              <Text style={styles.text}>Following</Text>
            </View>
            <View style={styles.statsTotal}>
              <Text style={[styles.text, styles.number]}>{this.props.stats.followers}</Text>
              <Text style={styles.text}>Followers</Text>
            </View>
            <View style={styles.statsTotal}>
              <Text style={[styles.text, styles.number]}>{this.props.stats.followers}</Text>
              <Text style={styles.text}>Reviews</Text>
            </View>
          </View>
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
