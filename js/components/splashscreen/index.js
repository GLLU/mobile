
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Button, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { connect } from 'react-redux';

import styles from './styles';
import { loginViaFacebook } from '../../actions/user';
import _ from 'lodash';

const { navigateTo } = actions;

const { navigateTo } = actions;

const background = require('../../../images/background.jpg');
const logo = require('../../../images/splash-logo.png');
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
} = MK;

const PERMISSIONS = ["email", "public_profile"];

const SignUpEmailButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Teal)
  .withTextStyle({
    color: 'white',
    fontWeight: 'normal',
  })
  .withStyle({
    height: 40,
    borderRadius: 0
  })
  .withText('Signup with Email')
  .build();

class SplashPage extends Component {

  static propTypes = {
    loginViaFacebook: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  singupWithEmail() {
    console.log('Go To Signup with Email');
  }

  connectWithFB() {
    const self = this;
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(PERMISSIONS).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          const diffPermissions = _.difference(result.grantedPermissions, PERMISSIONS);
          if (diffPermissions.length == 0) {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                const infoRequest = new GraphRequest('/me?fields=gender', null, (error, result) => {
                  if (error) {
                    alert(`Failed to retrieve user info: ${JSON.stringify(error)}`);
                  } else {
                    const jsonData = { access_token: data["accessToken"], expirationTime: data["expirationTime"], data: result };
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

  render() {
    console.log('splash screen');
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>
              <View style={styles.signupContainer}>
                <SignUpEmailButton onPress={() => this.singupWithEmail() } />
                <Text style={styles.label}>Or</Text>
                <Icon.Button style={styles.btnFB}
                   name="facebook"
                   backgroundColor="#3b5998"
                   onPress={this.connectWithFB.bind(this)}>
                 Connect with facebook
               </Icon.Button>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomContainerContent}>Terms of Service and Privacy Policy</Text>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    loginViaFacebook: data => dispatch(loginViaFacebook(data)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SplashPage);
