
import React, { Component } from 'react';
import asScreen from '../common/containers/Screen';
import listenToAppState from '../common/eventListeners/AppStateListener';
import { View, Image, Linking, Platform, Text, TouchableOpacity, WebView, KeyboardAvoidingView } from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'react-native-i18n';
import Utils from '../../utils';
import { connect } from 'react-redux';
import styles from './styles';
import { checkLogin, loginViaFacebook } from '../../actions';
import { instagramSignIn } from '../../actions/user';
import _ from 'lodash';
import Config from 'react-native-config';
import Video from 'react-native-video';
import glluTheme from '../../themes/gllu-theme';
import HollowButton from '../common/buttons/HollowButton';
import Colors from '../../styles/Colors.styles';
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');
const logo = require('../../../images/logo/inFashLogo.png');

class LoginPage extends Component {

  static propTypes = {
    isLoading: React.PropTypes.number,
    loginViaFacebook: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.handleEmailSigninPress = this.handleEmailSigninPress.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this.hideInstagramModal = this.hideInstagramModal.bind(this);
    this.showInstagramModal = this.showInstagramModal.bind(this);
    this.state = {
      name: '',
      repeat: props.currentAppState === 'active',
      modalVisible: false,
    };
    if (this.props.showTutorial && Platform !== 'ios') {
      // this.props.navigateTo('tutorialscreen');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAppState !== this.props.currentAppState) {
      if (this.props.currentAppState === 'active') {
        this._root.seek(0);
      }
      this.setState({ repeat: nextProps.currentAppState === 'active' });
    }
  }

  connectWithFB() {
    this.props.logEvent('loginscreen', { name: 'Facebook signup click' });
    // Attempt a login using the Facebook login dialog asking for default permissions.
    Utils.loginWithFacebook()
      .then(data => this.props.loginViaFacebook(data)
        .then(user => this.props.resetTo('feedscreen'))
        .catch(err => console.log('facebook login Error', err)))
      .catch(err => console.log('facebook login Error', err));
  }

  handleEmailSignupPress() {
    this.props.logEvent('loginscreen', { name: 'Email signup click' });
    this.props.navigateTo('genderselect', {signupBy: 'email'});
  }

  handleEmailSigninPress() {
    this.props.logEvent('loginscreen', { name: 'Email signin click' });
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
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderMainView() {
    return (
      <View style={styles.signupContainer}>
        <View style={{ height: 50, marginBottom: 10 }} >
          <HollowButton label="Signup with Email" onPress={this.handleEmailSignupPress.bind(this)} />
        </View>
        <Icon.Button
          iconStyle={styles.btnFB}
          style={styles.fbIcon}
          borderRadius={4}
          name="facebook"
          backgroundColor="#3b5998"
          onPress={this.connectWithFB.bind(this)}>
              Connect with facebook
            </Icon.Button>
        <View style={{ marginTop: 10 }}>
          <Icon.Button
            iconStyle={styles.btnFB}
            style={styles.fbIcon}
            borderRadius={4}
            name="instagram"
            backgroundColor={Colors.instagramLogin}
            onPress={this.showInstagramModal}>
              Connect with Instagram
          </Icon.Button>
        </View>
        <View style={styles.alreadyBox}>
          <Text style={styles.alreadyTxt}>Already a user?</Text>
          <TouchableOpacity onPress={this.handleEmailSigninPress}><Text style={styles.loginTxt}>{i18n.t('LOGIN')}</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  hideInstagramModal() {
    this.setState({ modalVisible: false });
  }

  showInstagramModal() {
    this.setState({ modalVisible: true });
  }

  _onNavigationStateChange(webViewState) {
    const { url } = webViewState;
    const { instagramSignIn, resetTo, navigateTo } = this.props
    if (url && url.startsWith(`${Config.INSTAGRAM_REDIRECT_URL}/#access_token`)) {
      const accessToken = url.split('#access_token=').pop(); // => "instagram access_token"
      instagramSignIn(accessToken).then(() => {
        this.hideInstagramModal();
        resetTo('feedscreen');
      }).catch(err => navigateTo('genderselect', {signupBy: 'instagram', accessToken}));
    }
  }

  _renderInstagramModal() {
    const clientId = Config.INSTAGRAM_CLIENT_ID;
    const redirectUrl = Config.INSTAGRAM_REDIRECT_URL;
    return (
      <View style={styles.modalWarp}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardStyle}>
          <View style={styles.contentWarp}>
            <WebView
              style={[{ flex: 1 }]}
              source={{ uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token` }}
              scalesPageToFit
              startInLoadingState
              onNavigationStateChange={this._onNavigationStateChange}
              onError={this._onNavigationStateChange}
            />
            <TouchableOpacity onPress={this.hideInstagramModal} style={styles.btnStyle}>
              <Text style={styles.closeStyle} >Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  render() {
    const {repeat, modalVisible} = this.state
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Content scrollEnabled>
            <View style={styles.allView}>
              <Video
                source={Platform.OS === 'ios' ? require('../../../android/app/src/main/res/raw/newspla.mp4') : { uri: 'newspla', mainVer: 1, patchVer: 0 }}
                resizeMode="stretch"
                muted
                style={styles.videoBackground}
                repeat={repeat}
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
            {modalVisible ? this._renderInstagramModal() : null}
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    loginViaFacebook: data => dispatch(loginViaFacebook(data)),
    checkLogin: user => dispatch(checkLogin(user)),
    instagramSignIn: accessToken => dispatch(instagramSignIn(accessToken)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  showTutorial: state.user.showTutorial,
});

export default connect(mapStateToProps, bindAction)(asScreen(listenToAppState(LoginPage)));
