
import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
import { RadioButtons } from 'react-native-radio-buttons'

import { emailSignUp } from '../../actions/user';


import styles from './styles';

const { popRoute, pushRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

const genders = [
    "Male",
    "Female"
];

class SignUpPage extends Component {

  static propTypes = {
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
          gender: 'male',
          usernameValid: 'times',
          nameValid: 'times',
          passwordValid: 'times',
          confirmPasswordValid: 'times',
          emailValid: 'times',
      };

  }

  singupWithEmail() {
      let { username, password, confirmPassword,  email, name, gender, usernameValid, passwordValid, confirmPasswordValid, emailValid, nameValid } = this.state;
      let validationArray = [ usernameValid, passwordValid, emailValid, nameValid, confirmPasswordValid  ] ;
        if(validationArray.indexOf('times') === -1) {
            console.log('all validation passed');
            let data = {
                email,
                username,
                name,
                gender: gender.toLowerCase(),
                password,
                confirmPassword

            }
            this.props.emailSignUp(data);
        }
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  validateTextInput(value, type) {
      let toValidString = type+'Valid'
      if(value.length > 2){
          this.setState({[toValidString]: 'check', [type]: value});
      } else {
          this.setState({[toValidString]: 'times', [type]: ''});
      }
  }


  validateEmailInput(value) {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(re.test(value)){
          this.setState({emailValid: 'check', email: value});
      } else {
          this.setState({emailValid: 'times', email: ''});
       }
  }

  validatePasswordInput(value) {
      let re = /^[a-zA-Z0-9]{3,30}$/
      if(re.test(value)){
          this.setState({passwordValid: 'check', password: value});
      } else {
          this.setState({passwordValid: 'times', password: ''});
      }
  }

  confirmPasswordInput(value) {
      let pass = this.state.password
      if(value === pass){
          this.setState({confirmPasswordValid: 'check', confirmPassword: value});
      } else {
          this.setState({confirmPasswordValid: 'times', confirmPassword: ''});
      }
  }

  pushRoute(route) {
      this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container>
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
              <Button large style={styles.uploadImgBtn} warning>
                <IconB size={30} color={MKColor.Teal} name='camera' style={styles.uploadImgIcon}/>
              </Button>
            </View>
          <View>
            <Grid style={styles.signupForm}>
              <Row style={styles.formItem}>
                <Text style={styles.label}>Username</Text>
                <InputGroup style={styles.formGroup}>
                  <Input style={styles.formInput} onChangeText={(username) => this.validateTextInput(username, 'username')}/>
                </InputGroup>
                <IconB size={20} color={MKColor.Teal} name={this.state.usernameValid} style={styles.uploadImgIcon}/>
              </Row>
              <Row style={styles.formItem}>
                <Text style={styles.label}>Name</Text>
                <InputGroup style={styles.formGroup}>
                  <Input style={styles.formInput} onChangeText={(name) => this.validateTextInput(name, 'name')}/>
                </InputGroup>
                <IconB size={20} color={MKColor.Teal} name={this.state.nameValid} style={styles.uploadImgIcon}/>
              </Row>
              <Row style={styles.formItem}>
                <Text style={styles.label}>Email</Text>
                <InputGroup style={styles.formGroup}>
                  <Input style={styles.formInput} onChangeText={(email) => this.validateEmailInput(email)}/>
                </InputGroup>
                <IconB size={20} color={MKColor.Teal} name={this.state.emailValid} style={styles.uploadImgIcon}/>
              </Row>
              <Row style={styles.formItem}>
                <Text style={styles.label}>Password</Text>
                <InputGroup style={styles.formGroup}>
                  <Input style={styles.formInput} secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                </InputGroup>
                <IconB size={20} color={MKColor.Teal} name={this.state.passwordValid} style={styles.uploadImgIcon}/>
              </Row>
              <Row style={styles.formItem}>
                <Text style={[styles.label, styles.confirmPass]}>Confirm Password</Text>
                <InputGroup style={styles.formGroup}>
                  <Input style={styles.formInput} secureTextEntry onChangeText={(confirmPassword) => this.confirmPasswordInput(confirmPassword)}/>
                </InputGroup>
                <IconB size={20} color={MKColor.Teal} name={this.state.confirmPasswordValid} style={styles.uploadImgIcon}/>
              </Row>
              <Row>
                <RadioButtons
                  options={ genders }
                  onSelection={ this.setGenderSelectedOption.bind(this) }
                  selectedOption={this.state.gender }
                  renderOption={ this.renderRadioOption }
                  renderContainer={ this.renderRadioContainer }
                />
              </Row>
            </Grid>
            <Button color='lightgrey' style={styles.formBtn} onPress={() => this.singupWithEmail()}>
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
    setGenderSelectedOption(genderSelectedOption){
        this.setState({
            gender: genderSelectedOption
        });
    }

    renderRadioOption(option, selected, onSelect, index){
        return (
            <View key={index}>
                <TouchableWithoutFeedback onPress={onSelect} >
                    <View style={styles.radioOption}>
                        <Text style={[ styles.radioBtn, selected ? {color: MKColor.Teal} : null]}>{option}</Text>
                        { index === 0 ? <Text style={styles.radioSlash}>/</Text> : null }
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    renderRadioContainer(optionNodes){
        return (
            <View style={styles.radioView}>
                <Text style={styles.genderLabel}>Gender</Text>
                {optionNodes}
            </View>
        );
    }
}



function bindAction(dispatch) {
  return {
    emailSignUp: (data) => dispatch(emailSignUp(data)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpPage);
