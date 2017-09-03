
import React, { Component } from 'react';
import asScreen from '../common/containers/Screen'
import listenToAppState from '../common/eventListeners/AppStateListener'
import { View, Image, Linking, Platform, Dimensions, Text, StyleSheet, TouchableOpacity , WebView, KeyboardAvoidingView} from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'react-native-i18n';
import Utils from '../../utils'
import { connect } from 'react-redux';
import styles from './styles';
import { checkLogin, loginViaFacebook } from '../../actions';
import _ from 'lodash';
import Video from 'react-native-video';
import glluTheme from '../../themes/gllu-theme';
import HollowButton from '../common/buttons/HollowButton'
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';
import SolidButton from "../common/buttons/SolidButton";

const background = require('../../../images/backgrounds/bags.png');
const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');
const logo = require('../../../images/logo/inFashLogo.png');

let PERMISSIONS = ["email", "public_profile"];

class LoginPage extends Component {

  static propTypes = {
    isLoading: React.PropTypes.number,
    loginViaFacebook: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.handleEmailSigninPress=this.handleEmailSigninPress.bind(this);
    this._onNavigationStateChange=this._onNavigationStateChange.bind(this);
    this.hide=this.hide.bind(this);
    this.state = {
      name: '',
      repeat: props.currentAppState==='active',
      modalVisible: true
    };
    if(this.props.showTutorial && Platform !== 'ios'){
      //this.props.navigateTo('tutorialscreen');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentAppState!==this.props.currentAppState){
      if(this.props.currentAppState==='active'){
        this._root.seek(0)
      }
      this.setState({repeat:nextProps.currentAppState==='active'})
    }
  }

  connectWithFB() {
    this.props.logEvent('loginscreen', { name: 'Facebook signup click' });
    // Attempt a login using the Facebook login dialog asking for default permissions.
    Utils.loginWithFacebook()
      .then((data) => this.props.loginViaFacebook(data)
        .then(user=>this.props.resetTo('feedscreen'))
        .catch((err) => console.log('facebook login Error',err)))
      .catch((err) => console.log('facebook login Error',err))
  }

  handleEmailSignupPress() {
    this.props.logEvent('loginscreen', {name: 'Email signup click'});
    this.props.navigateTo('genderselect');
  }

  handleEmailSigninPress() {
    this.props.logEvent('loginscreen', {name: 'Email signin click'});
    this.props.navigateTo('signinemail');
  }

  handleTermPress() {
    this.handleOpenLink(TERMS_URL);
  }

  handlePrivacyPolicyPress() {
    this.handleOpenLink(PRIVACY_URL);
  }

  handleOpenLink(url) {
    this.props.logEvent('loginscreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderMainView() {
    return (
        <View style={styles.signupContainer}>
          <View style={{height:50, marginBottom:10}} >
            <HollowButton label='Signup with Email' onPress={this.handleEmailSignupPress.bind(this)} />
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
            <TouchableOpacity onPress={this.handleEmailSigninPress }><Text style={styles.loginTxt}>{i18n.t('LOGIN')}</Text></TouchableOpacity>
          </View>
        </View>
    )
  }

  hide () {
    this.setState({ modalVisible: false })
  }

  _onNavigationStateChange (webViewState) {
    const { url } = webViewState
    console.log('boooommm000',webViewState)
    if (url && url.startsWith('www.infash.com')) {
      console.log('boooommm11')
      const match = url.match(/#(.*)/)
      if (match && match[1]) {
        const params = qs.parse(match[1])
        if (params.access_token) {
          this.hide()
          this.props.onLoginSuccess(params.access_token)
        }
      } else {
        this.hide()
      }
    }
  }

  render() {
    const clientId = '2e3d4a2f2bc246eb85419bf6d180181f'
    const redirectUrl = 'https://www.infash.com'
    const scopes = ['public_content']

    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Content scrollEnabled={true}>
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
                  <Text style={styles.text}>By signing-up I agree to inFash </Text>
                  <Text style={styles.link} onPress={this.handleTermPress.bind(this)}>Terms</Text>
                  <Text style={styles.text}> and </Text>
                  <Text style={styles.link} onPress={this.handlePrivacyPolicyPress.bind(this)}>Privacy Policy</Text>
                </View>
            </View>
            <View style={styles.modalWarp}>
              <KeyboardAvoidingView behavior='padding' style={styles.keyboardStyle}>
                <View style={styles.contentWarp}>
                  <WebView
                    style={[{ flex: 1 }]}
                    source={{ uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token` }}
                    scalesPageToFit
                    startInLoadingState
                    onNavigationStateChange={this._onNavigationStateChange}
                    onError={this._onNavigationStateChange}
                  />
                  <TouchableOpacity onPress={this.hide} style={styles.btnStyle}>
                    <Image source={logo} style={styles.closeStyle} />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    loginViaFacebook: data => dispatch(loginViaFacebook(data)),
    checkLogin: (user) => dispatch(checkLogin(user)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  showTutorial: state.user.showTutorial
});

export default connect(mapStateToProps, bindAction)(asScreen(listenToAppState(LoginPage)));
