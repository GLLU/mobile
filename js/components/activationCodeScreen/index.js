
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import { invitationCheckExistance } from '../../actions/user';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';
import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';
import { emailRule, passwordRule } from '../../validators';

const logo = require('../../../images/logo.png');
const { popRoute, pushRoute } = actions;
const background = require('../../../images/backgrounds/enterCodeBG.png');

class ActivationCodeScreen extends BasePage {

  static propTypes = {
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
      this.state = {
          renderEnterCode: true,
          email: '',
          code: '',
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
    this.logEvent('SignInEmailScreen', { name: 'Lets GLLU click' });
    this.props.invitationCheckExistance(this.state.code, this.props.navigation.routes[1].optional);
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
              <InputGroup style={styles.formGroup}>
                <Input style={styles.formInput} placeholder="Enter Invitation Code" placeholderTextColor="white" onChangeText={(code) => this.setInvitationCode(code)}/>
              </InputGroup>
            </Row>
          </Grid>
          <Button color='white' style={[styles.formBtn, styles.validationPassed  ]} onPress={this.handleSigninPress.bind(this)}>
            <Text>Submit</Text>
          </Button>
          <View style={styles.centerBox}>
            <Text style={[styles.alreadyTxt, {opacity: 0.8}]}>Don't have code? <Text style={[styles.alreadyTxt, {fontWeight: '600', opacity: 10}]}>Apply for code</Text></Text>
            <Button color={'#009688'} style={[styles.alreadyBtn, {paddingHorizontal: 0}]} onPress={this.renderGetCode.bind(this)}><Text style={{color: '#009688', fontSize: 13, bottom: 2.5, textDecorationLine: 'underline'}}> here</Text></Button>
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

  _renderGetCode() {
    return (
      <View style={{  justifyContent: 'center' }}>
        <View>
          <Grid>
            <Row style={[styles.formItem, styles.formItemGetCode]}>
              <InputGroup style={styles.formGroup}>
                <Input style={[styles.formInput, styles.formInputGetCode]} placeholder="Name" placeholderTextColor="white" ref='name'  onChangeText={(name) => this.validateTextInput(name, 'name')}/>
              </InputGroup>
            </Row>
            <Row style={[styles.formItem, styles.formItemGetCode]}>
              <InputGroup style={styles.formGroup}>
                <Input style={[styles.formInput, styles.formInputGetCode]} placeholder="Email" ref='email' keyboardType={'email-address'} placeholderTextColor="white" onChangeText={(email) => this.validateEmailInput(email)}/>
              </InputGroup>
            </Row>
          </Grid>
          <Button color='white' style={[styles.formBtn, styles.validationPassed  ]} onPress={this.handleSigninPress.bind(this)}>
            Ask for Code
          </Button>
          <View style={styles.centerBox}>
            <Text style={[styles.alreadyTxt, {opacity: 0.8}]}>Already have a code?</Text>
            <Button color={'#009688'} style={[styles.alreadyBtn, {paddingHorizontal: 0}]} onPress={this.renderEnterCode.bind(this)}><Text style={{color: '#009688', fontSize: 13, bottom: 2.5, textDecorationLine: 'underline'}}> Click here</Text></Button>
          </View>
        </View>
      </View>
      )

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
            <Header style={styles.header} >
              <Button transparent onPress={() => this.popRoute()}>
                <Icon style={styles.headerArrow} name="ios-arrow-back" />
              </Button>
              <Title style={styles.headerTitle}>Invitation Code</Title>
            </Header>
            <Content scrollEnabled={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              { this.state.renderEnterCode ? this._renderEnterCode() : this._renderGetCode() }
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
      invitationCheckExistance: (code, continueTo) => dispatch(invitationCheckExistance(code, continueTo)),
      popRoute: key => dispatch(popRoute(key)),
      pushRoute: (route, key) => dispatch(pushRoute(route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  error: state.errorHandler.error
});

export default connect(mapStateToProps, bindAction)(ActivationCodeScreen);
