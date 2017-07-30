import React, {Component} from 'react';
import asScreen from '../common/containers/Screen'
import {
  Image, Linking, TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView
} from 'react-native';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import {Row, Grid} from "react-native-easy-grid";
import {emailSignUp} from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import styles from './styles';
import {emailRule, passwordRule, textInput} from '../../validators';
import {changeUserAvatar} from '../../actions/user';
import { showFatalError } from '../../actions/errorHandler';
import ProfileAvatar from '../common/avatars/ProfileAvatar'
import SolidButton from '../common/buttons/SolidButton'
import {openCamera} from '../../lib/camera/CameraUtils'
import Header from "../common/headers/Header";
import Spinner from '../loaders/Spinner'
import {formatAvatar} from "../../utils/UploadUtils";

const background = require('../../../images/backgrounds/hands.png');
const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

class SignUpPage extends Component {

  static propTypes = {
    emailSignUp: React.PropTypes.func
  }

  constructor(props) {

    super(props);
    this.focusNext = this.focusNext.bind(this);
    this.state = {
      isSigningUp: false,
      username: { value: '', isValid: true },
      email: { value: '', isValid: true },
      password: { value: '', isValid: true },
      confirmPassword: { value: '', isValid: true },
      name: { value: '', isValid: true },
      avatar: '',
      avatarIcon: 'camera',
      gender: props.navigation.state.params.gender,
    };
  }

  componentDidMount() {
    this.focusNext('usernameInput');
  }

  singupWithEmail() {
    let {
      username,
      password,
      email,
      name,
      avatar,
      gender
    } = this.state;

    const errorMessage = this.checkValidations();
    if (!errorMessage) {
      let data = {
        email,
        username,
        avatar,
        name,
        gender: gender.toLowerCase(),
        password,
        confirmPassword: password,
      }
      this.setState({ isSigningUp: true }, () => {
        this.props.emailSignUp(data)
          .then(user => {
            this.props.logEvent('SignUpScreen', {
              name: `user signed up with email ${email}`,
              invitation_token: this.props.invitation_token
            });
            this.props.resetTo('feedscreen', user)
          })
          .catch(err => console.log(err));
      })
    }
    else {
      this.props.onInvalidSignup(errorMessage);
    }
  }

  checkValidations() {
    let {
      name,
      password,
      email,
      username
    } = this.state;

    let validationArray = [username, password, email, name];

    let errorMessage;

    for (i = 0; i < validationArray.length; i++) {

      let currentField = validationArray[i];
      if (!currentField.isValid || currentField.length === 0) {
        return currentField.errorMessage;
      }
    }

    return errorMessage;

  }

  validateTextInput(value, type) {
    textInput.validate(value, (err) => {
      if (!err) {
        this.setState({ [type]: { value: value, isValid: true }});
      } else {
        this.setState({ [type]: { value: value, isValid: false, errorMessage: 'invalid text' }});
      }
    })

  }

  validateEmailInput(email) {
    emailRule.validate(email, (err) => {
      if (!err) {
        this.setState({ email: { value: email, isValid: true } });
      } else {
        this.setState({ email: { value: email, isValid: false, errorMessage: 'invalid email' } });
      }
    });
  }

  validatePasswordInput(password) {
    passwordRule.validate(password, (err) => {
      if (!err) {
        this.setState({ password: { value: password, isValid: true }});
      } else {
        this.setState({ password: { value: password, isValid: false, errorMessage: 'invalid password' }});
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
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
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
      this.setState({ avatar: image, avatarIcon: 'check' })
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
            <Header title='Sign Up' goBack={this.props.goBack}/>
            <Content scrollEnabled={true}>

              <View style={styles.uploadImgContainer}>
                <ProfileAvatar avatarUrl={this.state.avatar.path} changeUserAvatar={this.handleCameraPress.bind(this)}
                               isEditable={true}/>
              </View>
              <KeyboardAvoidingView behavior='padding'>
                <Grid>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Username'
                      placeholderTextColor='lightgrey'
                      ref={c => this.usernameInput = c}
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.focusNext('nameInput')}
                      returnKeyType='next'
                      style={[styles.formInput]}
                      onChangeText={(username) => this.validateTextInput(username, 'username')}/>
                    {this.state.username.value.length !== 0 ?
                      <IconB size={20} color={'#009688'} name={this.state.username.isValid ? 'check' : 'times'}
                             style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Name'
                      placeholderTextColor='lightgrey'
                      ref={c => this.nameInput = c}
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.focusNext('emailInput')}
                      returnKeyType='next'
                      style={[styles.formInput]}
                      onChangeText={(name) => this.validateTextInput(name, 'name')}/>
                    {this.state.name.value.length !== 0 ?
                      <IconB size={20} color={'#009688'} name={this.state.name.isValid ? 'check' : 'times'}
                             style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Email'
                      keyboardType='email-address'
                      placeholderTextColor='lightgrey'
                      ref={c => this.emailInput = c}
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.focusNext('passwordInput')}
                      returnKeyType='next'
                      style={[styles.formInput]}
                      onChangeText={(email) => this.validateEmailInput(email)}/>
                    {this.state.email.value.length > 0 ?
                      <IconB size={20} color={'#009688'} name={this.state.email.isValid ? 'check' : 'times'}
                             style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Password'
                      placeholderTextColor='lightgrey'
                      ref={c => this.passwordInput = c}
                      secureTextEntry={true}
                      style={[styles.formInput]}
                      onChangeText={(password) => this.validatePasswordInput(password)}/>
                    {this.state.password.value.length > 0 ?
                      <IconB size={20} color={'#009688'} name={this.state.password.isValid ? 'check' : 'times'}
                             style={styles.uploadImgIcon}/> : null}
                  </Row>
                </Grid>
                <SolidButton
                  showLoader={this.state.isSigningUp}
                  label="Let's infash"
                  style={[styles.formBtn, allValid ? styles.validationPassed : null]}
                  onPress={this.handleSignupPress.bind(this)}
                  loaderElement={<Spinner animating={this.state.isSigningUp} size={'small'} style={{ left: 10 }}/>}
                />
                <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Already a user?</Text>
                  <TouchableOpacity onPress={this.handleLoginPress.bind(this)}><Text
                    style={styles.clickHere}>Click Here</Text></TouchableOpacity>
                </View>
              </KeyboardAvoidingView>

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
    emailSignUp: (data) => dispatch(emailSignUp(data)),
    changeUserAvatar: (data) => dispatch(changeUserAvatar(data)),
    onInvalidSignup: errorMessage => dispatch(showFatalError(errorMessage)),
  };
}
const mapStateToProps = state => ({
  invitation_token: state.user.invitation_token
});
export default connect(mapStateToProps, bindAction)(asScreen(SignUpPage));