import React, {Component} from 'react';
import asScreen from '../common/containers/Screen'
import {
  Image, TouchableWithoutFeedback, Linking, View, StyleSheet, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import {Row, Grid} from "react-native-easy-grid";
import SolidButton from '../common/buttons/SolidButton'
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';
import {emailSignIn} from '../../actions/user';
import Spinner from '../loaders/Spinner'

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';
import Header from "../common/headers/Header";

const logo = require('../../../images/logo/inFashLogo.png');

const background = require('../../../images/backgrounds/bags.png');
const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');

import {emailRule, passwordRule} from '../../validators';

class SignInPage extends Component {

  static propTypes = {
    emailSignIn: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.focusNext = this.focusNext.bind(this);
    this.state = {
      isSigningIn: false,
      email: '',
      password: '',
      passwordValid: 'times',
      emailValid: 'times',
      allValid: false
    };
  }

  componentDidMount() {
    this.focusNext('emailInput');
  }

  singinWithEmail() {
    let { password, email } = this.state;
    const data = { email, password };
    if (this.checkValidations() && !this.state.isSigningIn) {
      this.setState({ isSigningIn: true }, () => {
        this.props.emailSignIn(data)
          .then(user => {
            this.props.logEvent('SignInScreen', { name: 'Sign in successful!' });
            this.props.resetTo('feedscreen')
          })
          .catch(error => {
            this.props.logEvent('SignInScreen', { name: 'Sign in failed!' });
            this.setState({ isSigningIn: false });
          })
      });
    }
}
checkValidations()
{
  let {
    passwordValid,
    emailValid
  } = this.state;

  let validationArray = [passwordValid, emailValid];
  return (validationArray.indexOf('times') === -1)
}

validateEmailInput(email)
{
  emailRule.validate(email, (err) => {
    if (!err) {
      this.setState({ email, emailValid: 'check' });
    } else {
      this.setState({ email, emailValid: 'times' });
    }
  });
}

validatePasswordInput(password)
{
  passwordRule.validate(password, (err) => {
    if (!err) {
      this.setState({ password, passwordValid: 'check' });
    } else {
      this.setState({ password, passwordValid: 'times' });
    }
  });
}

handleTermPress()
{
  this.handleOpenLink(TERMS_URL);
}

handlePrivacyPolicyPress()
{
  this.handleOpenLink(PRIVACY_URL);
}

handleOpenLink(url)
{
  this.props.logEvent('SignInScreen', { name: 'Link click', url });
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}

handleSigninPress = () => {
  this.props.logEvent('SignInScreen', { name: 'Lets inFash click' });
  this.singinWithEmail();
}

handleForgotPasswordPress()
{
  this.props.logEvent('SignInScreen', { name: 'Forgot password click' });
  this.props.navigateTo('forgotpassword');
}

focusNext(value)
{
  this[value].focus();
}

render()
{
  let allValid = this.checkValidations()
  return (
    <Container theme={glluTheme}>
      <View style={styles.container}>
        <Image source={background} style={styles.shadow} blurRadius={5}>
          <Image source={backgroundShadow} style={styles.bgShadow}/>
          <Header title='Sign In' goBack={this.props.goBack}/>
          <Content scrollEnabled={true}>
            <View style={StyleSheet.flatten(styles.logoContainer)}>
              <Image source={logo} style={StyleSheet.flatten(styles.logo)}/>
            </View>
            <KeyboardAvoidingView behavior='padding'>
              <Grid>
                <Row style={styles.formItem}>
                  <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    placeholderTextColor='lightgrey'
                    ref={c => this.emailInput = c}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNext('passwordInput')}
                    returnKeyType='next'
                    autoCorrect={false}
                    style={[styles.formInput]}
                    onChangeText={(email) => this.validateEmailInput(email)}/>
                  {this.state.email.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.emailValid}
                                                        style={styles.uploadImgIcon}/> : null}
                </Row>
                <Row style={styles.formItem}>
                  <TextInput
                    placeholder='Password'
                    placeholderTextColor='lightgrey'
                    ref={c => this.passwordInput = c}
                    secureTextEntry={true}
                    returnKeyType='next'
                    onSubmitEditing={() => this.handleSigninPress()}
                    style={[styles.formInput]}
                    onChangeText={(password) => this.validatePasswordInput(password)}/>
                  {this.state.password.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.passwordValid}
                                                           style={styles.uploadImgIcon}/> : null}
                </Row>
              </Grid>
              <SolidButton
                showLoader={this.state.isSigningIn}
                label="Let's infash"
                disabled={!allValid}
                style={[styles.formBtn, allValid ? styles.validationPassed : null]}
                onPress={this.handleSigninPress}
              />
              <View style={styles.alreadyBox}>
                <Text style={styles.alreadyTxt}>Forgot your password?</Text>
                <TouchableOpacity onPress={this.handleForgotPasswordPress.bind(this)}><Text
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
    emailSignIn: (data) => dispatch(emailSignIn(data))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(asScreen(SignInPage));
