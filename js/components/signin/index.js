
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";

const logo = require('../../../images/logo.png');
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';
import { emailSignIn } from '../../actions/user';
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';
const { popRoute, pushRoute } = actions;

const background = require('../../../images/backgrounds/bags.png');
const backgroundShadow = require('../../../images/background-shadow-70p.png');

import { emailRule, passwordRule } from '../../validators';
 
class SignInPage extends BasePage {

  static propTypes = {
    emailSignIn: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
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
          this.props.emailSignIn(data);
      }
  }
  checkValidations() {
    let {
        passwordValid,
        emailValid } = this.state;

    let validationArray = [ passwordValid, emailValid ];
    return (validationArray.indexOf('times') === -1)
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 2 }, this.props.navigation.key);
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
    this.pushRoute('forgotpassword');
  }

  render() {
    let allValid = this.checkValidations()
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
          <Image source={backgroundShadow} style={styles.bgShadow} />
          <Header style={styles.header} >
            <Button transparent onPress={() => this.popRoute()}>
              <Icon style={styles.headerArrow} name="ios-arrow-back" />
            </Button>
            <Title style={styles.headerTitle}>Sign in</Title>
          </Header>
          <Content scrollEnabled={false}>
              <View style={styles.logoContainer}>
                  <Image source={logo} style={styles.logo} />
              </View>
          <View>
            <Grid>
                <Row style={[styles.formItem]} >
                  <TouchableWithoutFeedback onPress={() => this.focusOnInput('email')}>
                    <Text style={[styles.label,  this.state.email.length !== 0 ? styles.addOpacity : null]}>Email</Text>
                  </TouchableWithoutFeedback>
                    <InputGroup style={styles.formGroup}>
                        <Input style={styles.formInput} focus={true} ref='email' keyboardType={'email-address'} onChangeText={(email) => this.validateEmailInput(email)}/>
                    </InputGroup>
                    { this.state.email.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                </Row>
                <Row style={styles.formItem}>
                  <TouchableWithoutFeedback onPress={() => this.focusOnInput('password')} >
                    <Text style={[styles.label,  this.state.password.length !== 0 ? styles.addOpacity : null]}>Password</Text>
                  </TouchableWithoutFeedback>
                  <InputGroup style={styles.formGroup}>
                    <Input style={styles.formInput} ref='password' secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                  </InputGroup>
                    { this.state.password.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                </Row>
            </Grid>
            <Button color='lightgrey' style={[styles.formBtn, allValid ? styles.validationPassed : null ]} onPress={this.handleSigninPress.bind(this)}>
              Let's GLLU
            </Button>
              <View style={styles.alreadyBox}>
                <Text style={styles.alreadyTxt}>Forgot your password?</Text>
                <Button color={'#009688'} style={styles.alreadyBtn} onPress={this.handleForgotPasswordPress.bind(this)}>Click Here</Button>
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
      emailSignIn: (data) => dispatch(emailSignIn(data)),
      popRoute: key => dispatch(popRoute(key)),
      pushRoute: (route, key) => dispatch(pushRoute(route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignInPage);
