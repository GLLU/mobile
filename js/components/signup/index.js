import React, { Component } from 'react';
import BasePage from '../common/base/BasePage';
import { Image, Linking, TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Title, Content, Icon, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import { emailSignUp } from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import styles from './styles';
import { emailRule, passwordRule, textInput } from '../../validators';
import { changeUserAvatar } from '../../actions/user';
import ImagePicker from 'react-native-image-crop-picker';
import LetsGLLUButton from "./LetsGLLUButton";
import {openCamera} from '../../lib/camera/CameraUtils'

const background = require('../../../images/backgrounds/hands.png');
const backgroundShadow = require('../../../images/shadows/background-shadow-70p.png');

import {
  TERMS_URL,
  PRIVACY_URL,
} from '../../constants';

class SignUpPage extends BasePage {

  static propTypes = {
    emailSignUp: React.PropTypes.func
  }

  constructor(props) {

    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      avatar: '',
      avatarIcon: 'camera',
      gender: props.navigation.state.params.gender,
      usernameValid: 'times',
      nameValid: 'times',
      passwordValid: 'times',
      confirmPasswordValid: 'times',
      emailValid: 'times',
    };
  }

  singupWithEmail() {
    let {
      username,
      password,
      email,
      name,
      avatar,
      gender } = this.state;
    if(this.checkValidations()) {
      let data = {
        email,
        username,
        avatar,
        name,
        gender: gender.toLowerCase(),
        password,
        confirmPassword: password,
      }
      this.props.emailSignUp(data)
        .then(user=>this.resetTo('feedscreen',user))
        .catch(err=>console.log(err));
    }
  }

  checkValidations() {
    let {
      usernameValid,
      passwordValid,
      emailValid,
      nameValid } = this.state;

    let validationArray = [usernameValid, passwordValid, emailValid, nameValid];
    return (validationArray.indexOf('times') === -1)
  }

  validateTextInput(value, type) {
    textInput.validate(value, (err) => {
      if(!err){
        this.setState({ [type]: value, [type+'Valid']: 'check' });
      } else {
        this.setState({ [type]: value, [type+'Valid']: 'times' });
      }
    })

  }


  validateEmailInput(email) {
    emailRule.validate(email, (err) => {
      if(!err){
        this.setState({ email, emailValid: 'check' });
      } else {
        this.setState({ email, emailValid: 'times' });
      }
    });
  }

  validatePasswordInput(password) {
    passwordRule.validate(password, (err) => {
      if(!err){
        this.setState({ password, passwordValid: 'check' });
      } else {
        this.setState({ password, passwordValid: 'times' });
      }
    });
  }

  handleCameraPress() {
    this.logEvent('SignUpEmailScreen', { name: 'Camera click' });
    this.openCamera();
  }

  handleSignupPress() {
    this.logEvent('SignUpEmailScreen', { name: 'Lets inFash click' });
    this.singupWithEmail();
  }

  handleLoginPress() {
    this.logEvent('SignUpEmailScreen', { name: 'Already user click' });
    this.navigateTo('signinemail');
  }

  handleTermPress() {
    this.handleOpenLink(TERMS_URL);
  }

  handlePrivacyPolicyPress() {
    this.handleOpenLink(PRIVACY_URL);
  }

  handleOpenLink(url) {
    this.logEvent('SignUpEmailScreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  addUserAvatar() {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      image.type = 'multipart/form-data'
      image.uri = image.path;
      this.setState({avatar: image, avatarIcon: 'check'})
    });
  }

  async openCamera() {
    this.logEvent('Signup', { name: 'Open Camera click' });
    let image = {};
    image.path = await openCamera(false);
    image.type = 'multipart/form-data'
    console.log('image',image)
    this.setState({avatar: image, avatarIcon: 'check'})
  }

  focusOnInput(refAttr) {
    this.refs[refAttr]._textInput.focus();
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
                <Text style={styles.headerTitle}>Sign up</Text>
              </View>
            </View>
            <Content scrollEnabled={false}>
              <View style={styles.uploadImgContainer}>
                <View style={{height: 100, width: 100, borderRadius:50}}>
                  <View style={styles.uploadImgBtn}>
                    <TouchableOpacity onPress={this.handleCameraPress.bind(this)}>
                      <IconB size={30} color={'#009688'} name={this.state.avatarIcon} style={StyleSheet.flatten(styles.uploadImgIcon)}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <Grid>
                  <Row style={styles.formItem}>
                    <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('usernamze')}>
                      <View>
                        <Text style={[styles.label,  this.state.username.length !== 0 ? styles.addOpacity : null]}>Username</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} ref="username" onChangeText={(username) => this.validateTextInput(username, 'username')}/>
                    </InputGroup>
                    {this.state.username.length !== 0 ? <IconB size={20} color={'#009688'} name={this.state.usernameValid} style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('name')}>
                      <View>
                        <Text style={[styles.label,  this.state.name.length !== 0 ? styles.addOpacity : null]}>Name</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} ref='name'  onChangeText={(name) => this.validateTextInput(name, 'name')}/>
                    </InputGroup>
                    {this.state.name.length !== 0 ? <IconB size={20} color={'#009688'} name={this.state.nameValid} style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('email')}>
                      <View>
                        <Text style={[styles.label, this.state.email.length > 0 ? styles.addOpacity : null]}>Email</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} ref='email' onChangeText={(email) => this.validateEmailInput(email)}/>
                    </InputGroup>
                    {this.state.email.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('password')}>
                      <View>
                        <Text style={[styles.label, this.state.password.length > 0 ? styles.addOpacity : null]}>Password</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
                      <Input style={StyleSheet.flatten(styles.formInput)} ref='password' secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                    </InputGroup>
                    {this.state.password.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                  </Row>
                </Grid>
                <LetsGLLUButton style={[styles.formBtn, allValid ? styles.validationPassed : null ]} onPress={this.handleSignupPress.bind(this)}/>
                <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Already a user?</Text>
                  <TouchableOpacity onPress={this.handleLoginPress.bind(this)}><Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>Click Here</Text></TouchableOpacity>
                </View>
              </View>

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
  };
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(SignUpPage);