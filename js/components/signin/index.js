
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';
import { Row, Grid } from "react-native-easy-grid";
const logo = require('../../../images/logo.png');

import styles from './styles';

import { emailSignIn } from '../../actions/user';

const { popRoute, pushRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;


class SignInPage extends Component {

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
          emailValid: 'times'
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

  validateEmailInput(value) {
    this.setState({email: value});
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(value)){
        this.setState({emailValid: 'check'});
    } else {
        this.setState({emailValid: 'times'});
    }
  }

  validatePasswordInput(value) {
    this.setState({password: value});
    let re = /^[a-zA-Z0-9]{3,30}$/;
    if(re.test(value)){
        this.setState({passwordValid: 'check'});
    } else {
        this.setState({passwordValid: 'times'});
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
            <Title style={styles.headerTitle}>Signin for Gllu</Title>
          </Header>
          <Content scrollEnabled={false}>
              <View style={styles.logoContainer}>
                  <Image source={logo} style={styles.logo} />
              </View>
          <View>
            <Grid>
                <Row style={styles.formItem}>
                    <Text style={[styles.label,  this.state.email.length !== 0 ? styles.addOpacity : null]}>Email</Text>
                    <InputGroup style={styles.formGroup}>
                        <Input style={styles.formInput} keyboardType={'email-address'} onChangeText={(email) => this.validateEmailInput(email)}/>
                    </InputGroup>
                    { this.state.email.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.emailValid} style={styles.uploadImgIcon}/>  : null}
                </Row>
                <Row style={styles.formItem}>
                    <Text style={[styles.label,  this.state.password.length !== 0 ? styles.addOpacity : null]}>Password</Text>
                    <InputGroup style={styles.formGroup}>
                        <Input style={styles.formInput} secureTextEntry onChangeText={(password) => this.validatePasswordInput(password)}/>
                    </InputGroup>
                    { this.state.password.length > 0 ? <IconB size={20} color={MKColor.Teal} name={this.state.passwordValid} style={styles.uploadImgIcon}/>  : null}
                </Row>
            </Grid>
            <Button color='lightgrey' style={[styles.formBtn, this.checkValidations() ? styles.validationPassed : null ]} onPress={() => this.singinWithEmail()}>
              Let's GLLU
            </Button>
              <View style={styles.alreadyBox}>
                  <Text style={styles.alreadyTxt}>Forgot your password?</Text>
                  <Button color={MKColor.Teal} style={styles.alreadyBtn} onPress={() => this.pushRoute('forgotpassword') }>Click Here</Button>
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
      emailSignIn: (data) => dispatch(emailSignIn(data)),
      popRoute: key => dispatch(popRoute(key)),
      pushRoute: (route, key) => dispatch(pushRoute(route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignInPage);
