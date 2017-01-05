
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon,  InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";

import styles from './styles';

const { navigateTo } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

const {
    popRoute
} = actions;

class SignUpPage extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
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
          name: '',
          usernameValid: 'times',
          nameValid: 'times',
          passwordValid: 'times',
          emailValid: 'times'
      };
  }

  singupWithEmail() {
      console.log('state',this.state)
      let { username, password, email, name, country } = this.state;
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  validateTextInput(value, type) {
      let toValidString = type+'Valid'
      if(value.length > 2){
          this.setState({[toValidString]: 'check'});
          this.setState({[type]: value});
      } else {
          this.setState({[toValidString]: 'times'});
          this.setState({[type]: ''});
      }
  }


  validateEmailInput(value) {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(re.test(value)){
          this.setState({emailValid: 'check'});
          this.setState({email: value});
      } else {
          this.setState({emailValid: 'times'});
           this.setState({email: ''});
       }
  }

  validatePasswordInput(value) {
      let re = /^[a-zA-Z0-9]{3,30}$/
      if(re.test(value)){
          this.setState({passwordValid: 'check'});
          this.setState({password: value});
      } else {
          this.setState({passwordValid: 'times'});
          this.setState({password: ''});
      }
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
            </Grid>
            <Button color='lightgrey' style={styles.formBtn} onPress={() => this.singupWithEmail()}>
              Let's GLLU
            </Button>
              <View style={styles.alreadyBox}>
                <Text style={styles.alreadyTxt}>Already a user?</Text>
                <Button color={MKColor.Teal} style={styles.alreadyBtn}>Login Here</Button>
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
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpPage);
