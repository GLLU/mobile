import React, { Component } from 'react';
import asScreen from '../common/containers/Screen'
import {
  Image, Linking, TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView
} from 'react-native';
import { Container, Header, Button, Title, Content, Icon, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import { emailSignUp } from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import styles from './styles';
import { emailRule, passwordRule, textInput } from '../../validators';
import { changeUserAvatar } from '../../actions/user';
import CircleProfileImage from '../common/avatars/CircleProfileImage'
import SolidButton from "../common/buttons/SolidButton";
import {openCamera} from '../../lib/camera/CameraUtils'

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
        .then(user=>{
          this.props.logEvent('SignUpScreen', {name: `user signed up with email ${email}`, invitation_token: this.props.invitation_token});
          this.props.resetTo('feedscreen',user)
        })
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
    this.props.logEvent('SignUpScreen', { name: 'Camera click' });
    this.openCamera();
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

  async openCamera() {
    this.props.logEvent('SignUpScreen', { name: 'Open Camera click' });
    let image = {};
    image.path = await openCamera(false);
    image.type = 'multipart/form-data'
    console.log('image',image)
    this.setState({avatar: image, avatarIcon: 'check'})
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
                <Button transparent onPress={this.props.goBack}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Sign up</Text>
              </View>
            </View>
            <Content scrollEnabled={false}>

              <View style={styles.uploadImgContainer}>
                <View style={{height: 100, width: 100, borderRadius:50}}>
                    <CircleProfileImage style = {styles.uploadImgBtn} avatarUrl={this.state.avatar.path} changeUserAvatar={this.handleCameraPress.bind(this)} editable={true}/>
                </View>
              </View>
              <KeyboardAvoidingView behavior='padding'>
                <Grid>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Username'
                      placeholderTextColor='lightgrey'
                      style={[styles.formInput]}
                      onChangeText={(username) => this.validateTextInput(username,'username')}/>
                    {this.state.username.length !== 0 ? <IconB size={20} color={'#009688'} name={this.state.usernameValid} style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Name'
                      placeholderTextColor='lightgrey'
                      style={[styles.formInput]}
                      onChangeText={(name) => this.validateTextInput(name,'name')}/>
                    {this.state.name.length !== 0 ? <IconB size={20} color={'#009688'} name={this.state.nameValid} style={styles.uploadImgIcon}/> : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Email'
                      keyboardType='email-address'
                      placeholderTextColor='lightgrey'
                      style={[styles.formInput]}
                      onChangeText={(email) => this.validateEmailInput(email)}/>
                    {this.state.email.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                  </Row>
                  <Row style={styles.formItem}>
                    <TextInput
                      placeholder='Password'
                      placeholderTextColor='lightgrey'
                      secureTextEntry={true}
                      style={[styles.formInput]}
                      onChangeText={(password) => this.validatePasswordInput(password)}/>
                    {this.state.password.length > 0 ? <IconB size={20} color={'#009688'} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                  </Row>
                </Grid>
                <SolidButton label="Let's infash" style={[styles.formBtn, allValid ? styles.validationPassed : null ]} onPress={this.handleSignupPress.bind(this)}/>
                <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Already a user?</Text>
                  <TouchableOpacity onPress={this.handleLoginPress.bind(this)}><Text style={{color:'#009688', fontSize:13, paddingLeft:5}}>Click Here</Text></TouchableOpacity>
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
  };
}
const mapStateToProps = state => ({
  invitation_token:state.user.invitation_token
});
export default connect(mapStateToProps, bindAction)(asScreen(SignUpPage));