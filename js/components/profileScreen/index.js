import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Container, Content, Header, Title, Text, View, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import glluTheme from '../../themes/gllu-theme';

const backgroundShadow = require('../../../images/background-shadow.png');
const userbBackground = require('../../../images/backgrounds/user-profile-background.jpeg');
const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const toFeedScreen = require('../../../images/icons/toFeedScreen.png');
const toSettings = require('../../../images/icons/um.png');
const plus = require('../../../images/icons/plus.png');
const { popRoute } = actions

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
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.isMyProfile ? profileBackground : userbBackground}>
          <Image source={backgroundShadow} style={styles.bgShadow} >
          <TouchableOpacity transparent onPress={() => this._tempPopRoute()}>
            <Image source={toFeedScreen} style={{marginTop: 30, marginLeft: 10, backgroundColor: 'transparent', position: 'absolute', width: 30, height: 30}} name="ios-arrow-back" />
          </TouchableOpacity>
          </Image>
        </Image>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),

  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    myUserId: state.user.id
  };
};

export default connect(mapStateToProps, bindAction)(ProfileScreen);
