
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { View, Image, Linking, Platform, AppState, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import Utils from '../../Utils.js'
import { connect } from 'react-redux';
import styles from './styles';
import { loginViaFacebook } from '../../actions/user';
import _ from 'lodash';
import Video from 'react-native-video';
import { navigateTo } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import { emailSignIn } from '../../actions/user';
import SignUpEmailButton from './SignUpEmailButton'

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow-70p.png');
const logo = require('../../../images/logo.png');

const {
    pushRoute
} = actions;

let PERMISSIONS = ["email", "public_profile"];

class SplashPage extends BasePage {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    isLoading: React.PropTypes.number,
    loginViaFacebook: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      repeat: true
    };
    console.log('this.props.showTutorial',this.props.showTutorial)
    if(!this.props.showTutorial){
      this.props.navigateTo('tutorialscreen','splashscreen');
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  pushRoute(route) {
      this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  _handleAppStateChange = (nextAppState) => {
    switch(nextAppState) {
      case 'inactive':
        this.setState({repeat: false})
        break;
      case 'active':
        this.setState({repeat: true})
        this._root.seek(1)
        break;
    }
  }

  connectWithFB() {
    this.logEvent('Splashscreen', { name: 'Facebook signup click' });
    // Attempt a login using the Facebook login dialog asking for default permissions.
    if(this.props.invitation_token !== -1) {
      Utils.loginWithFacebook().then((data) => this.props.loginViaFacebook(data))
        .catch((err) => console.log('facebook login Error',err))
    } else {
      this.props.navigateTo('activationcode', 'splashscreen', 'facebook');
    }

  }

  handleEmailSignupPress() {
    this.logEvent('Splashscreen', {name: 'Email signup click'});
    console.log('this.props',this.props)
    if(this.props.invitation_token !== -1) {
      this.pushRoute('genderselect');
    } else {
      //this.pushRoute('activationcode');
      this.props.navigateTo('activationcode', 'splashscreen', 'genderselect');
    }

  }

  handleTermPress() {
    this.handleOpenLink(TERMS_URL);
  }

  handlePrivacyPolicyPress() {
    this.handleOpenLink(PRIVACY_URL);
  }

  handleOpenLink(url) {
    this.logEvent('Splashscreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderMainView() {
    return (
        <View style={styles.signupContainer}>
          <View style={{height:50}} >
          <SignUpEmailButton onPress={this.handleEmailSignupPress.bind(this)} />
          </View>
          <Icon.Button iconStyle={styles.btnFB}
                       style={styles.fbIcon}
                       borderRadius={4}
                       name="facebook"
                       backgroundColor="#3b5998"
                       onPress={this.connectWithFB.bind(this)}>
            Connect with facebook
          </Icon.Button>
          <View style={styles.alreadyBox}>
            <Text style={styles.alreadyTxt}>Already a user?</Text>
            <TouchableOpacity onPress={() => this.pushRoute('signinemail') }><Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>Login Here</Text></TouchableOpacity>
          </View>
        </View>
    )
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Content scrollEnabled={false}>
            <View style={styles.allView}>
              <Video source={Platform.OS === 'ios' ? require('../../../android/app/src/main/res/raw/newspla.mp4') : { uri: 'newspla', mainVer: 1, patchVer: 0}}
                     resizeMode="stretch"
                     muted={true}
                     style={styles.videoBackground}
                     repeat={this.state.repeat}
                     ref={component => this._root = component}
                      />
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>
                {this.renderMainView()}
                <View style={styles.bottomContainerContent}>
                  <Text style={styles.text}>By signing-up I agree to gllu's </Text>
                  <Text style={styles.link} onPress={this.handleTermPress.bind(this)}>Terms</Text>
                  <Text style={styles.text}> and </Text>
                  <Text style={styles.link} onPress={this.handlePrivacyPolicyPress.bind(this)}>Privacy Policy</Text>
                </View>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    emailSignIn: (data) => dispatch(emailSignIn(data)),
    loginViaFacebook: data => dispatch(loginViaFacebook(data)),
    navigateTo: (route, homeRoute, continueTo) => dispatch(navigateTo(route, homeRoute, continueTo)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  invitation_token: state.user.invitation_token,
  showTutorial: state.user.showTutorial

});

export default connect(mapStateToProps, bindAction)(SplashPage);
