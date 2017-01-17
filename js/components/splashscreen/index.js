
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from 'react-native-navigation-redux-helpers';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import styles from './styles';
import { loginViaFacebook } from '../../actions/user';
import _ from 'lodash';

const { navigateTo } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const logo = require('../../../images/logo.png');
const MK = require('react-native-material-kit');

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
                    console.log('user info from facebook', result);
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
          <SignUpEmailButton onPress={() => this.pushRoute('genderselect') } />
          <Text style={styles.label}>Or</Text>
          <Icon.Button style={styles.btnFB}
                       name="facebook"
                       backgroundColor="#3b5998"
                       onPress={this.connectWithFB.bind(this)}>
            Connect with facebook
          </Icon.Button>
          <View style={styles.alreadyBox}>
            <Text style={styles.alreadyTxt}>Already a user?</Text>
            <Button color={MKColor.Teal} style={styles.alreadyBtn} onPress={() => this.pushRoute('signinemail') }>Login Here</Button>
          </View>
        </View>
    )
  }

  render() {
    console.log('splash screen');
    return (
      <Container>
        <View style={styles.container}>
          <Content scrollEnabled={false}>
            <Image source={background} style={styles.shadow}>
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.titleHeading}>Fashion that Fits</Text>
              </View>
                {this.renderMainView()}
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomContainerContent}>Terms of Service and Privacy Policy</Text>
              </View>
            </Image>
              {this.props.isLoading !== 0 ? <SpinnerSwitch /> : null}
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
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  isLoading: state.api.isCreating
});

export default connect(mapStateToProps, bindAction)(SplashPage);
