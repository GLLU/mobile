
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Dimensions, Platform, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import { emailSignUp } from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import { emailRule, passwordRule, textInput } from '../../validators';
import { changeUserAvatar } from '../../actions/user';
import ImagePicker from 'react-native-image-crop-picker';
const deviceHeight = Dimensions.get('window').height;

const { popRoute, pushRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;


class SignUpPage extends BasePage {

  static propTypes = {
    gender: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    emailSignUp: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
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
          gender: this.props.gender,
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
          confirmPassword,
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
          this.props.emailSignUp(data);
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


  popRoute() {
    this.props.popRoute(this.props.navigation.key);
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

  confirmPasswordInput(confirmPassword) {
      let pass = this.state.password
      if(confirmPassword === pass){
          this.setState({ confirmPasswordValid: 'check' });
      } else {
          this.setState({ confirmPassword, confirmPasswordValid: 'times' });
      }
  }

  pushRoute(route) {
      this.props.pushRoute({ key: route, index: 2 }, this.props.navigation.key);
  }

  addUserAvatar() {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      data = {
        image,
      }

      image.type = 'multipart/form-data'
      image.uri = image.path;
      this.setState({avatar: image, avatarIcon: 'check'})
    });
  }

  focusOnInput(refAttr) {
    this.refs[refAttr]._textInput.focus();
  }

  handleTermsBtn() {
    Linking.openURL('https://www.gllu.com/Terms').catch(err => console.error('An error occurred', err));
  }

  handlePrivacyPolicyBtn() {
    Linking.openURL('https://www.gllu.com/Privacy').catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <Container theme={glluTheme}>
          <View style={styles.container}>
              <Image source={background} style={styles.shadow} blurRadius={5}>
                  <Image source={backgroundShadow} style={styles.bgShadow} />
                  <Header style={styles.header} >
                      <Button transparent onPress={() => this.popRoute()}>
                          <Icon style={styles.headerArrow} name="ios-arrow-back" />
                      </Button>
                      <Title style={styles.headerTitle}>Sign up</Title>
                  </Header>
                  <Content scrollEnabled={false}>
                      <View style={styles.uploadImgContainer}>
                          <Button large style={styles.uploadImgBtn} warning onPress={() => this.addUserAvatar()}>
                              <IconB size={30} color={MKColor.Teal} name={this.state.avatarIcon} style={styles.uploadImgIcon}/>
                          </Button>
                      </View>
                      <View>
                        <Grid>
                            <Row style={styles.formItem}>
                              <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('username')}>
                               <Text style={[styles.label,  this.state.username.length !== 0 ? styles.addOpacity : null]}>Username</Text>
                              </TouchableWithoutFeedback>
                                <InputGroup style={styles.formGroup}>
                                    <Input style={styles.formInput} ref="username" onChangeText={(username) => this.validateTextInput(username, 'username')}/>
                                </InputGroup>
                                {this.state.username.length !== 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.usernameValid} style={styles.uploadImgIcon}/> : null}
                            </Row>
                            <Row style={styles.formItem}>
                              <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('name')}>
                                <Text style={[styles.label,  this.state.name.length !== 0 ? styles.addOpacity : null]}>Name</Text>
                              </TouchableWithoutFeedback>
                                <InputGroup style={styles.formGroup}>
                                    <Input style={styles.formInput} ref='name'  onChangeText={(name) => this.validateTextInput(name, 'name')}/>
                                </InputGroup>
                                {this.state.name.length !== 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.nameValid} style={styles.uploadImgIcon}/> : null}
                            </Row>
                            <Row style={styles.formItem}>
                              <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('email')}>
                                <Text style={[styles.label, this.state.email.length > 0 ? styles.addOpacity : null]}>Email</Text>
                              </TouchableWithoutFeedback>
                                <InputGroup style={styles.formGroup}>
                                    <Input style={styles.formInput} ref='email' onChangeText={(email) => this.validateEmailInput(email)}/>
                                </InputGroup>
                                {this.state.email.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                            </Row>
                            <Row style={styles.formItem}>
                              <TouchableWithoutFeedback onPress={(e) => this.focusOnInput('password')}>
                                <Text style={[styles.label, this.state.password.length > 0 ? styles.addOpacity : null]}>Password</Text>
                              </TouchableWithoutFeedback>
                                <InputGroup style={styles.formGroup}>
                                    <Input style={styles.formInput} ref='password' secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                                </InputGroup>
                                {this.state.password.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                            </Row>
                        </Grid>
                        <Button color='lightgrey' style={[styles.formBtn, this.checkValidations() ? styles.validationPassed : null ]} onPress={() => this.singupWithEmail()}>
                            Let's GLLU
                        </Button>
                        <View style={styles.alreadyBox}>
                            <Text style={styles.alreadyTxt}>Already a user?</Text>
                            <Button color={MKColor.Teal} style={styles.alreadyBtn} onPress={() => this.pushRoute('signinemail') }>Login Here</Button>
                        </View>
                      </View>

                  </Content>
                <Text style={[styles.bottomContainerContent]} >By signing-up I agree to gllu's <Text style={[styles.bottomContainerContent, {textDecorationLine: 'underline'}]} onPress={() => this.handleTermsBtn() }>Terms</Text> and <Text style={[styles.bottomContainerContent, {textDecorationLine: 'underline'}]} onPress={() => this.handlePrivacyPolicyBtn() }>Privacy Policy</Text></Text>
              </Image>
          </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
    return {
    emailSignUp: (data) => dispatch(emailSignUp(data)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    changeUserAvatar: (data) => dispatch(changeUserAvatar(data)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpPage);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  headerArrow: {
    color: '#FFFFFF'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight
  },
  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  bgShadow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0
  },
  uploadImgContainer: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 10
  },
  uploadImgBtn: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100
  },
  uploadImgIcon: {
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  formItem: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderColor: 'rgba(192,192,192, .3)',
    height: 55,
    paddingLeft: 0,
    alignItems: 'flex-end'
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    paddingLeft: 0
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
  },
  addOpacity: {
    opacity: 0.8
  },
  confirmPass: {
    paddingBottom: 10
  },
  genderSelectContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formInput: {
    flex: 1,
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    alignItems: 'stretch',
    color: '#FFFFFF',
    marginLeft: 10,
    top: (Platform.OS === 'ios') ? 0 : 13,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
    backgroundColor: MKColor.Teal
  },
  countrySelectView: {
    flex:1,
  },
  countrySelectInput: {
    padding:10,
    height:40,
    color: '#FFFFFF',
    paddingLeft: 20,
    marginLeft: 10
  },
  alreadyBox: {
    alignSelf: 'center',
    flexDirection:'row',
  },
  alreadyTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8
  },
  alreadyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: (Platform.OS === 'ios') ? 0 : 5,
  },
  genderBtnContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: deviceHeight/4
  },
  genderImage:{
    width: 130,
    height: 130,
    borderRadius: 65
  },
  genderLabel:{
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 15,
    opacity: 0.8
  },
  bottomContainerContent: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: (Platform.OS === 'ios') ? 10 : 35,    opacity: 0.8,
    backgroundColor: 'transparent'
  },
});