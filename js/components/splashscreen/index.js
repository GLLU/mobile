
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, Linking, Platform, AppState, Dimensions } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import styles from './styles';
import { loginViaFacebook } from '../../actions/user';
import _ from 'lodash';
import Video from 'react-native-video';
const deviceWidth = Dimensions.get('window').width;
const { navigateTo } = actions;
const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow-70p.png');
const logo = require('../../../images/logo.png');
const MK = require('react-native-material-kit');

import glluTheme from '../../themes/gllu-theme';
import { emailSignIn } from '../../actions/user';

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

const {
  MKButton,
  MKColor,
} = MK;

const {
    pushRoute
} = actions;

let PERMISSIONS = ["email", "public_profile"];

const SignUpEmailButton = MKButton.coloredFlatButton()
  .withBackgroundColor('transparent')
  .withTextStyle({
    color: 'white',
    fontWeight: '600',
  })
  .withStyle({
    height: 40,
    borderRadius: 4,
    borderColor: MKColor.Teal,
    borderWidth: 2,
    marginBottom: 10,
    width: deviceWidth-80
  })
  .withText('Signup with Email')
  .build();

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
    LoginManager.logInWithReadPermissions(PERMISSIONS).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          const diffPermissions = _.difference(PERMISSIONS, result.grantedPermissions);
          if (diffPermissions.length == 0) {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                const infoRequest = new GraphRequest('/me?fields=id,name,email,gender', null, (error, result) => {
                  if (error) {
                    alert(`Failed to retrieve user info: ${JSON.stringify(error)}`);
                  } else {
                    const jsonData = { access_token: data["accessToken"], expiration_time: data["expirationTime"], data: result };
                    this.props.loginViaFacebook(jsonData);
                  }
                });
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            );
          } else {
            alert(`Missing permissions: ${diffPermissions.join(', ')}`);
          }
        }
      },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  handleEmailSignupPress() {
    this.logEvent('Splashscreen', {name: 'Email signup click'});
    this.pushRoute('genderselect');
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
          <SignUpEmailButton onPress={this.handleEmailSignupPress.bind(this)} />
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
            <Button color={MKColor.Teal} style={styles.alreadyBtn} textStyle={{fontSize: 13}} onPress={() => this.pushRoute('signinemail') }>Login Here</Button>
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
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SplashPage);
