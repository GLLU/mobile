
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, Linking } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import styles from './styles';
import { loginViaFacebook } from '../../actions/user';
import _ from 'lodash';

const { navigateTo } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const logo = require('../../../images/logo.png');
const MK = require('react-native-material-kit');

import glluTheme from '../../themes/gllu-theme';
import { emailSignIn } from '../../actions/user';

const {
  MKButton,
  MKColor,
} = MK;

const {
    pushRoute
} = actions;

const PERMISSIONS = ["email", "public_profile"];

const SignUpEmailButton = MKButton.coloredFlatButton()
  .withBackgroundColor(MKColor.Teal)
  .withTextStyle({
    color: 'white',
    fontWeight: '600',
  })
  .withStyle({
    height: 40,
    borderRadius: 0
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
    };
  }

  handleTermsBtn() {
    Linking.openURL('https://www.gllu.com/Terms').catch(err => console.error('An error occurred', err));
  }

  handlePrivacyPolicyBtn() {
    Linking.openURL('https://www.gllu.com/Privacy').catch(err => console.error('An error occurred', err));
  }

  pushRoute(route) {
      this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  connectWithFB() {
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

  renderMainView() {
    return (
        <View style={styles.signupContainer}>

          <Icon.Button iconStyle={styles.btnFB}
                       style={styles.fbIcon}
                       borderRadius={0}
                       name="facebook"
                       backgroundColor="#3b5998"
                       onPress={this.connectWithFB.bind(this)}>
            Connect with facebook
          </Icon.Button>
          <Text style={styles.label}>Or</Text>
          <SignUpEmailButton onPress={() => this.pushRoute('genderselect') } />
          <View style={styles.alreadyBox}>
            <Text style={styles.alreadyTxt}>Already a user?</Text>
            <Button color={MKColor.Teal} style={styles.alreadyBtn} onPress={() => this.pushRoute('signinemail') }><Text style={[styles.loginHereText, {color: MKColor.Teal}]}>Login Here</Text></Button>
          </View>
        </View>
    )
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Content scrollEnabled={false}>
            <Image source={background} style={styles.shadow}>
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.titleHeading}>Fashion that Fits</Text>
              </View>
                {this.renderMainView()}
              <Text style={[styles.bottomContainerContent]} >By signing-up I agree to gllu's <Text style={[styles.bottomContainerContent, {textDecorationLine: 'underline'}]} onPress={() => this.handleTermsBtn() }>Terms</Text> and <Text style={[styles.bottomContainerContent, {textDecorationLine: 'underline'}]} onPress={() => this.handlePrivacyPolicyBtn() }>Privacy Policy</Text></Text>
            </Image>
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
