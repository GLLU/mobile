
import React, { Component } from 'react';
import BasePage from '../common/base/BasePage';
import { Image, TouchableWithoutFeedback, Linking, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Title, Content, Icon, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";
import { invitationCheckExistance, requestInvitation, loginViaFacebook } from '../../actions/user';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';
import Utils from '../../utils'
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';
import { emailRule, passwordRule } from '../../validators';
import SplashButton from "./SplashButton";
import {NavigationActions} from "react-navigation";

const logo = require('../../../images/logo/inFashLogo.png');
const background = require('../../../images/backgrounds/forgot-password-background.png');

class ActivationCodeScreen extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.handleSigninPress=this.handleSigninPress.bind(this);
    this.onInvitationComplete=this.onInvitationComplete.bind(this);
    this.onInvitationRequestComplete=this.onInvitationRequestComplete.bind(this);
      this.state = {
          renderEnterCode: true,
          email: '',
          code: '',
          emailValid: 'times',
          name: '',
          allValid: false,
          correctEmail: false,
          renderThanksYou: false
      };
  }

  checkValidations() {
    let {
        passwordValid,
        emailValid } = this.state;

    let validationArray = [ passwordValid, emailValid ];
    return (validationArray.indexOf('times') === -1)
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

  setInvitationCode(code) {
    this.setState({ code });
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
    this.logEvent('ActivationScreen', { name: 'Submit click' });
    return this.props.invitationCheckExistance(this.state.code)
      .then(this.onInvitationComplete)
      .catch((err)=>console.log(err));
  }

  handleRequestCodePress() {

    const { name, email, emailValid } = this.state
    if(emailValid === 'check') {
      this.logEvent('ActivationScreen', { name: 'Request Code click' });
      const data = {name, email}
      return this.props.requestInvitation(data)
        .then(this.onInvitationRequestComplete)
        .catch((err)=>console.log(err));
    } else {
      this.setState({correctEmail: true})
    }

  }

  onInvitationRequestComplete() {
    this.setState({renderThanksYou: true})
  }

  onInvitationComplete() {
    const nextScreen=this.props.navigation.state.params;
    switch(nextScreen) {
      case 'genderselect':{
        this.resetWithPayload({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'splashscreen' }),
            NavigationActions.navigate({ routeName: 'genderselect'})
          ]
        });
        break;
      }
      case 'facebook': {
        Utils.loginWithFacebook()
          .then((data) => this.props.loginViaFacebook(data)
            .then(user=>this.resetTo('feedscreen',user))
            .catch((err) => console.log('facebook login Error',err)))
          .catch((err) => console.log('facebook login Error',err))
        break;
      }
      default:
        console.log(`cant navigateTo next screen`);
    }
  }

  validateTextInput(value) {
      this.setState({ name: value });
  }

  _renderEnterCode() {
    return (
      <View style={{  justifyContent: 'center' }}>
        <View style={styles.logoContainer}>
          <Text style={styles.invitationText}>Hey,</Text>
          <Text style={styles.invitationText}>This version is for invitees only.</Text>
          <Text style={styles.invitationText}>Please enter your invitation code below.</Text>
        </View>
        <View>
          <Grid>
            <Row style={styles.formItem}>
              <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                <Input style={StyleSheet.flatten(styles.formInput)} placeholder="Enter Invitation Code" placeholderTextColor="white" onChangeText={(code) => this.setInvitationCode(code)}/>
              </InputGroup>
            </Row>
          </Grid>
          <SplashButton style={[styles.formBtn ,styles.validationPassed ]} label='Submit' onPress={this.handleSigninPress}/>
          <View style={styles.centerBox}>
            <Text style={[styles.alreadyTxt, {opacity: 0.8}]}>Don't have code? <Text style={[styles.alreadyTxt, {fontWeight: '600', opacity: 10}]}>Apply for code</Text></Text>
            <TouchableOpacity onPress={this.renderGetCode.bind(this)}>
              <Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>here</Text>
            </TouchableOpacity>
          </View>
          {this.props.error ? this.renderError() : null}
        </View>
      </View>
    )
  }

  renderEnterCode() {
    this.setState({renderEnterCode: true})
  }

  renderGetCode() {
    this.setState({renderEnterCode: false})
  }

  renderThanksYou() {
    return (
    <View style={{position: 'absolute', top: 0}}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={{marginHorizontal: 50, marginTop: 10}}>
        <Text style={{textAlign: 'center', color: 'white'}}>Thanks for applying, we'll process the request and keep in touch soon</Text>
      </View>
    </View>

    )
  }

  _renderGetCode() {
if(this.state.renderThanksYou) {
  return this.renderThanksYou()
} else {
  return (
    <View style={{  justifyContent: 'center' }}>
      <View>
        <Grid>
          <Row style={[styles.formItem, styles.formItemGetCode]}>
            <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
              <Input style={StyleSheet.flatten(styles.formInputGetCode)} placeholder="Name" placeholderTextColor="white" ref='name'  onChangeText={(name) => this.validateTextInput(name, 'name')}/>
            </InputGroup>
          </Row>
          <Row style={[styles.formItem, this.state.correctEmail ? StyleSheet.flatten(styles.formItemGetCodeCorrect) : styles.formItemGetCode]}>
            <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
              <Input style={StyleSheet.flatten(styles.formInputGetCode)} placeholder="Email" ref='email' keyboardType={'email-address'} placeholderTextColor="white" onChangeText={(email) => this.validateEmailInput(email)}/>
            </InputGroup>
          </Row>
        </Grid>
        <SplashButton style={[styles.formBtn, styles.validationPassed]} label='Ask for Code' onPress={()=> this.handleRequestCodePress()}/>
        <View style={styles.centerBox}>
          <Text style={[styles.alreadyTxt, {opacity: 0.8}]}>Already have a code?</Text>
          <TouchableOpacity onPress={this.renderEnterCode.bind(this)}>
            <Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

  }

  renderError() {
    return(
    <View style={[styles.centerBox, styles.errorContainer]}>
      <Text style={styles.errorText}>{this.props.error}</Text>
      <Text style={styles.errorText}>Please try again or ask for new code</Text>
    </View>

    )
  }

  render() {
    let allValid = this.checkValidations()
    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow}>
            <View style={{height:50}}>
              <View style={styles.header} >
                <Button transparent onPress={() => this.goBack()}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Sign in</Text>
              </View>
            </View>
            <Content scrollEnabled={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              { this.state.renderEnterCode ? this._renderEnterCode() : this._renderGetCode() }
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
      invitationCheckExistance: (code, continueTo) => dispatch(invitationCheckExistance(code, continueTo)),
      requestInvitation: (data) => dispatch(requestInvitation(data)),
      loginViaFacebook: data => dispatch(loginViaFacebook(data)),
  };
}

const mapStateToProps = state => ({
  error: state.errorHandler.error
});

export default connect(mapStateToProps, bindAction)(ActivationCodeScreen);
