import React, {Component} from 'react';
import asScreen from '../common/containers/Screen';
import {
  Image, Linking, TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView,
} from 'react-native';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import {Row, Grid} from 'react-native-easy-grid';
import i18n from 'react-native-i18n';
import {emailSignUp} from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import styles from './styles';
import {emailRule, passwordRule, textInput} from '../../validators';
import {changeUserAvatar} from '../../actions/user';
import {showFatalError} from '../../actions/errorHandler';
import ProfileAvatar from '../common/avatars/ProfileAvatar';
import SolidButton from '../common/buttons/SolidButton';
import {openCamera} from '../../lib/camera/CameraUtils';
import Header from '../common/headers/Header';
import Spinner from '../loaders/Spinner';
import {formatAvatar} from '../../utils/UploadUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const background = require('../../../images/backgrounds/hands.png');
const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

class SignUpPage extends Component {

  static propTypes = {
    emailSignUp: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.focusNext = this.focusNext.bind(this);
    this.state = {
      isSigningUp: false,
      username: { value: '', errorMessage: i18n.t('TOO_SHORT') },
      email: { value: '', errorMessage: i18n.t('EMAIL_INVALID') },
      password: { value: '', errorMessage: i18n.t('PASSWORD_INVALID') },
      confirmPassword: { value: '' },
      name: { value: '', errorMessage: i18n.t('TOO_SHORT') },
      avatar: '',
      avatarIcon: 'camera',
      gender: props.navigation.state.params.gender,
    };
  }

  componentDidMount() {
    this.focusNext('usernameInput');
  }

  singupWithEmail() {
    const {
      username,
      password,
      email,
      name,
      avatar,
      gender,
    } = this.state;

    const errorMessage = this.checkValidations();
    if (!errorMessage) {
      const data = {
        email: email.value,
        username: username.value,
        avatar,
        name: name.value,
        gender: gender.toLowerCase(),
        password: password.value,
        confirmPassword: password.value,
      };
      this.setState({ isSigningUp: true }, () => {
        this.props.emailSignUp(data)
          .then((user) => {
            this.props.logEvent('SignUpScreen', {
              name: 'user signed up with email',
              email,
            });
            this.props.resetTo('feedscreen');
          })
          .catch(err => this.setState({ isSigningUp: false }));
      });
    } else {
      this.props.onInvalidSignup(errorMessage);
    }
  }

  checkValidations() {
    const {
      name,
      password,
      email,
      username,
    } = this.state;

    const validationArray = [username, password, email, name];

    let errorMessage;

    for (i = 0; i < validationArray.length; i++) {
      const currentField = validationArray[i];
      if (!currentField.isValid || currentField.length === 0) {
        return currentField.errorMessage;
      }
    }

    return errorMessage;
  }

  validateTextInput(value, type) {
    textInput.validate(value, (err) => {
      if (!err) {
        this.setState({ [type]: { value, isValid: true } });
      } else {
        this.setState({ [type]: { value, isValid: false, errorMessage: i18n.t('TOO_SHORT') } });
      }
    });
  }

  validateEmailInput(email) {
    emailRule.validate(email, (err) => {
      if (!err) {
        this.setState({ email: { value: email, isValid: true } });
      } else {
        this.setState({ email: { value: email, isValid: false, errorMessage: i18n.t('EMAIL_INVALID') } });
      }
    });
  }

  validatePasswordInput(password) {
    passwordRule.validate(password, (err) => {
      if (!err) {
        this.setState({ password: { value: password, isValid: true } });
      } else {
        this.setState({ password: { value: password, isValid: false, errorMessage: i18n.t('PASSWORD_INVALID') } });
      }
    });
  }

  handleCameraPress() {
    this.props.logEvent('SignUpScreen', { name: 'Camera click' });
    this.uploadAvatar();
  }

  handleSignupPress() {
    this.props.logEvent('SignUpScreen', { name: 'Lets inFash click' });
    this.singupWithEmail();
  }

  handleLoginPress() {
    this.props.logEvent('SignUpScreen', { name: 'Already user click' });
    this.props.navigateTo('signinemail');
  }

  handleTermPress() {
    this.handleOpenLink(TERMS_URL);
  }

  handlePrivacyPolicyPress() {
    this.handleOpenLink(PRIVACY_URL);
  }

  handleOpenLink(url) {
    this.props.logEvent('SignUpScreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  async uploadAvatar() {
    this.props.logEvent('SignUpScreen', { name: 'Open Camera click' });
    const path = await openCamera(false);
    const image = formatAvatar(path);
    if (image) {
      this.setState({ avatar: image, avatarIcon: 'check' });
    }
  }

  focusNext(value) {
    this[value].focus();
  }

  render() {
    const allValid = !this.checkValidations();
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
            <Image source={backgroundShadow} style={styles.bgShadow}/>
            <Header title="Sign Up" goBack={this.props.goBack}/>
            <Content scrollEnabled>
              <KeyboardAwareScrollView style={{ marginLeft: 16, marginRight: 16 }} extraScrollHeight={50}>
                <View style={styles.uploadImgContainer}>
                  <ProfileAvatar
                    avatarUrl={this.state.avatar.path} changeUserAvatar={this.handleCameraPress.bind(this)}
                    isEditable/>
                </View>
                <Text style={styles.inputTitle}>User Name</Text>
                <View style={styles.formItem}>
                  <TextInput
                    ref={c => this.usernameInput = c}
                    blurOnSubmit={false}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={() => this.focusNext('nameInput')}
                    returnKeyType="next"
                    style={[styles.formInput]}
                    onChangeText={username => this.validateTextInput(username, 'username')}/>
                  {this.state.username.value.length !== 0 ?
                    <IconB
                      size={20} color={'#009688'} name={this.state.username.isValid ? 'check' : 'times'}
                      style={styles.uploadImgIcon}/> : null}
                </View>
                <View style={styles.divider}/>
                <Text style={styles.inputTitle}>Name</Text>
                <View style={styles.formItem}>
                  <TextInput
                    ref={c => this.nameInput = c}
                    blurOnSubmit={false}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={() => this.focusNext('emailInput')}
                    returnKeyType="next"
                    style={[styles.formInput]}
                    onChangeText={name => this.validateTextInput(name, 'name')}/>
                  {this.state.name.value.length !== 0 ?
                    <IconB
                      size={20} color={'#009688'} name={this.state.name.isValid ? 'check' : 'times'}
                      style={styles.uploadImgIcon}/> : null}
                </View>
                <View style={styles.divider}/>
                <Text style={styles.inputTitle}>Email</Text>

                <View style={styles.formItem}>

                  <TextInput
                    placeholderTextColor="lightgrey"
                    ref={c => this.emailInput = c}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNext('passwordInput')}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    style={[styles.formInput]}
                    onChangeText={email => this.validateEmailInput(email)}/>
                  {this.state.email.value.length > 0 ?
                    <IconB
                      size={20} color={'#009688'} name={this.state.email.isValid ? 'check' : 'times'}
                      style={styles.uploadImgIcon}/> : null}
                </View>
                <View style={styles.divider}/>
                <Text style={styles.inputTitle}>Password</Text>

                <View style={styles.formItem}>
                  <TextInput
                    ref={c => this.passwordInput = c}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    style={styles.formInput}
                    onChangeText={password => this.validatePasswordInput(password)}/>
                  {this.state.password.value.length > 0 ?
                    <IconB
                      size={20} color={'#009688'} name={this.state.password.isValid ? 'check' : 'times'}
                      style={styles.uploadImgIcon}/> : null}
                  <View style={{ height: 1, backgroundColor: 'white', marginBottom: 16 }}/>
                </View>
                <View style={{ height: 1, backgroundColor: 'white', marginBottom: 16 }}/>
                <SolidButton
                  showLoader={this.state.isSigningUp}
                  label="Let's infash"
                  style={[styles.formBtn, allValid ? styles.validationPassed : null]}
                  onPress={this.handleSignupPress.bind(this)}
                />
                <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Already a user?</Text>
                  <TouchableOpacity onPress={this.handleLoginPress.bind(this)}><Text
                    style={styles.clickHere}>{i18n.t('CLICK_HERE')}</Text></TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>

            </Content>
            <View style={styles.bottomContainerContent}>
              <Text style={styles.text}>By signing-up I agree to inFash </Text>
              <Text style={styles.link} onPress={this.handleTermPress.bind(this)}>Terms</Text>
              <Text style={styles.text}> and </Text>
              <Text style={styles.link} onPress={this.handlePrivacyPolicyPress.bind(this)}>Privacy Policy</Text>
            </View>
          </Image>
        </View>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    emailSignUp: data => dispatch(emailSignUp(data)),
    changeUserAvatar: data => dispatch(changeUserAvatar(data)),
    onInvalidSignup: errorMessage => dispatch(showFatalError(errorMessage)),
  };
}
const mapStateToProps = state => ({
  invitation_token: state.user.invitation_token,
});
export default connect(mapStateToProps, bindAction)(asScreen(SignUpPage));
