
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import ModalPicker from 'react-native-modal-picker';
import { countries } from './countries'
import { emailSignUp } from '../../actions/user';
import glluTheme from '../../themes/gllu-theme';
import styles from './styles';
import { emailRule, passwordRule, textInput } from '../../validators';
import { changeUserAvatar } from '../../actions/user';
import ImagePicker from 'react-native-image-crop-picker';

const { popRoute, pushRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;


class SignUpPage extends Component {

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
          country: '',
          gender: this.props.gender,
          usernameValid: 'times',
          nameValid: 'times',
          passwordValid: 'times',
          confirmPasswordValid: 'times',
          emailValid: 'times',
          countryValid: 'times',

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
          gender,
          country } = this.state;

        if(this.checkValidations()) {
            let data = {
                email,
                username,
                avatar,
                name,
                gender: gender.toLowerCase(),
                password,
                confirmPassword: password,
                country: country.toLowerCase()
            }
            this.props.emailSignUp(data);
        }
  }

  checkValidations() {
      let {
          countryValid,
          usernameValid,
          passwordValid,
          emailValid,
          nameValid } = this.state;

      let validationArray = [usernameValid, passwordValid, emailValid, nameValid, countryValid];
      return (validationArray.indexOf('times') === -1)
  }


  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  validateTextInput(value, type) {
      textInput.validate(value, (err) => {
        if(!err){
          this.setState({ [type+'Valid']: 'check' });
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
      includeBase64: true,
      cropping: false,
    }).then(image => {
      data = {
        image,
      }
      this.setState({avatar: data, avatarIcon: 'check'})
    });
  }

  render() {
    console.log(this.state,'avatar')
    return (
      <Container theme={glluTheme}>
          <View style={styles.container}>
              <Image source={background} style={styles.shadow} blurRadius={5}>
                  <Image source={backgroundShadow} style={styles.bgShadow} />
                  <Header style={styles.header} >
                      <Button transparent onPress={() => this.popRoute()}>
                          <Icon style={styles.headerArrow} name="ios-arrow-back" />
                      </Button>
                      <Title style={styles.headerTitle}>Signup for Gllu</Title>
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
                                  <Text style={[styles.label,  this.state.username.length !== 0 ? styles.addOpacity : null]}>Username</Text>
                                  <InputGroup style={styles.formGroup}>
                                      <Input style={styles.formInput} ref="username" onChangeText={(username) => this.validateTextInput(username, 'username')}/>
                                  </InputGroup>
                                  {this.state.username.length !== 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.usernameValid} style={styles.uploadImgIcon}/> : null}
                              </Row>
                              <Row style={styles.formItem}>
                                  <Text style={[styles.label,  this.state.name.length !== 0 ? styles.addOpacity : null]}>Name</Text>
                                  <InputGroup style={styles.formGroup}>
                                      <Input style={styles.formInput} onChangeText={(name) => this.validateTextInput(name, 'name')}/>
                                  </InputGroup>
                                  {this.state.name.length !== 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.nameValid} style={styles.uploadImgIcon}/> : null}
                              </Row>
                              <Row style={styles.formItem}>
                                  <Text style={[styles.label, this.state.email.length > 0 ? styles.addOpacity : null]}>Email</Text>
                                  <InputGroup style={styles.formGroup}>
                                      <Input style={styles.formInput} onChangeText={(email) => this.validateEmailInput(email)}/>
                                  </InputGroup>
                                  {this.state.email.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                              </Row>
                              <Row style={styles.formItem}>
                                  <Text style={[styles.label, this.state.password.length > 0 ? styles.addOpacity : null]}>Password</Text>
                                  <InputGroup style={styles.formGroup}>
                                      <Input style={styles.formInput} secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                                  </InputGroup>
                                  {this.state.password.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                              </Row>
                              <Row style={styles.formItem}>
                                  <Text style={[styles.label, this.state.country.length > 0 ? styles.addOpacity : null]}>Country</Text>
                                  <View style={styles.countrySelectView}>
                                      <ModalPicker
                                          data={countries}
                                          initValue="Select Country"
                                          onChange={(country)=>{ this.setState({country: country.label}); this.validateTextInput(country.label, 'country')}}>
                                          <Text
                                              style={[styles.formInput, styles.countrySelectInput]}
                                              editable={false}
                                          >{this.state.country}</Text>
                                      </ModalPicker>
                                  </View>
                                  {this.state.country.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.countryValid} style={styles.uploadImgIcon}/>  : null}
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
