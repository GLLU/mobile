
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback, Linking, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Title, Content, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";

import LetsGLLUButton from './LetsGLLUButton'

import styles from './styles';
import glluTheme from '../../themes/gllu-theme';
import { emailSignIn } from '../../actions/user';
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

const logo = require('../../../images/logo.png');

const background = require('../../../images/backgrounds/bags.png');
const backgroundShadow = require('../../../images/background-shadow-70p.png');

import { emailRule, passwordRule } from '../../validators';

class SignInPage extends BasePage {

  static propTypes = {
    emailSignIn: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);

      this.state = {
          email: '',
          password: '',
          passwordValid: 'times',
          emailValid: 'times',
          allValid: false
      };

  }

  singinWithEmail() {
      let { password, email } = this.state;
      const data = { email, password };
      if(this.checkValidations()) {
          this.props.emailSignIn(data)
            .then(user=>this.resetTo('feedscreen'))
            .catch(error=>console.log('oh no! could not sign in!',error));
      }
  }
  checkValidations() {
    let {
        passwordValid,
        emailValid } = this.state;

    let validationArray = [ passwordValid, emailValid ];
    return (validationArray.indexOf('times') === -1)
  }

  pushRoute(route) {
    this.props.navigation.navigate(route)
  }

  validateEmailInput(email) {
    emailRule.validate(email, (err) => {
      if(!err){
        this.setState({email, emailValid: 'check'});
      } else {
        this.setState({email, emailValid: 'times'});
      }
    });
  }

  validatePasswordInput(password) {
    passwordRule.validate(password, (err) => {
      if(!err){
          this.setState({password, passwordValid: 'check'});
      } else {
          this.setState({password, passwordValid: 'times'});
      }
    });
  }

  focusOnInput(refAttr) {
    this.refs[refAttr]._textInput.focus();
  }

  handleTermPress() {
    this.handleOpenLink(TERMS_URL);
  }

  handlePrivacyPolicyPress() {
    this.handleOpenLink(PRIVACY_URL);
  }

  handleOpenLink(url) {
    this.logEvent('SignIn', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleSigninPress() {
    this.logEvent('SignInEmailScreen', { name: 'Lets GLLU click' });

   this.singinWithEmail();
  }

  handleForgotPasswordPress() {
    this.logEvent('SignInEmailScreen', { name: 'Forgot password click' });
    this.navigateTo('forgotpassword');
  }

  render() {
    let allValid = this.checkValidations()
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
            <Image source={backgroundShadow} style={styles.bgShadow} />
            <View style={{height:50}}>
              <View style={styles.header} >
                <Button transparent onPress={() => this.goBack()}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Sign in</Text>
              </View>
            </View>
            <Content scrollEnabled={false}>
              <View style={StyleSheet.flatten(styles.logoContainer)}>
                <Image source={logo} style={StyleSheet.flatten(styles.logo)} />
              </View>
              <View>
                <Grid>
                  <Row style={styles.formItem} >
                    <TouchableWithoutFeedback onPress={() => this.focusOnInput('email')}>
                      <View>
                        <Text style={[StyleSheet.flatten(styles.label),  this.state.email.length !== 0 ? StyleSheet.flatten(styles.addOpacity) : null]}>Email</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} focus={true} ref='email' keyboardType={'email-address'} onChangeText={(email) => this.validateEmailInput(email)}/>
                    </InputGroup>
                    { this.state.email.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.emailValid} style={StyleSheet.flatten(styles.uploadImgIcon)}/>  : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TouchableWithoutFeedback onPress={() => this.focusOnInput('password')} >
                      <View>
                        <Text style={[StyleSheet.flatten(styles.label),  this.state.password.length !== 0 ? styles.addOpacity : null]}>Password</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} ref='password' secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                    { this.state.password.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.passwordValid} style={StyleSheet.flatten(styles.uploadImgIcon)}/>  : null}
                    </InputGroup>
                  </Row>
                </Grid>
                <LetsGLLUButton style={[styles.formBtn, allValid ? styles.validationPassed : null ]} onPress={this.handleSigninPress.bind(this)}/>
                <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Forgot your password?</Text>
                  <TouchableOpacity onPress={this.handleForgotPasswordPress.bind(this)}><Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>Click Here</Text></TouchableOpacity>
                </View>
              </View>
            </Content>
            <View style={styles.bottomContainerContent}>
              <Text style={styles.text}>By signing-up I agree to gllu's </Text>
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

export default connect(mapStateToProps, bindAction)(SignInPage);
