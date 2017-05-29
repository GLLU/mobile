
import React, { Component } from 'react';
import BasePage from '../common/base/BasePage';
import { Image, TouchableWithoutFeedback,Text, View, StyleSheet } from 'react-native';
import {
  Container, Header, Button, Title, Content, Icon, InputGroup, Input, StyleProvider,
  getTheme
} from 'native-base';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";

import glluTheme from '../../themes/gllu-theme';
import { emailRule } from '../../validators';
import styles from './styles';

import { forgotPassword } from '../../actions/user';
import ResetMyPasswordButton from "./ResetMyPasswordButton";

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');


class forgotPasswordPage extends BasePage {

  static propTypes = {
    forgotPassword: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);

      this.state = {
          email: '',
          emailValid: 'times',
          emailWasSent: false
      };

  }

  forgotPasswordEmail() {
      let { email } = this.state;
      if(this.checkValidations()) {
        this.props.forgotPassword(email);
        this.setState({emailWasSent: true});
      }
  }

  checkValidations() {
    let { emailValid } = this.state;
    return (emailValid !== 'times')
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

  focusOnInput(refAttr) {
    this.refs[refAttr]._textInput.focus();
  }

  renderEmailSent() {
    return (
      <Content scrollEnabled={false}>
      <View style={styles.instuctionsContainer}>
        <Text style={styles.instuctions}>You will get an email shortly to recover your password</Text>
      </View>
      </Content>
    );
  }

  renderBeforeEmailSent() {
    return (
      <Content scrollEnabled={false}>
        <View style={styles.instuctionsContainer}>
          <Text style={styles.instuctions}>Please insert your email and we will send you details on reseting your password</Text>
        </View>
        <Grid>
          <Row style={styles.formItem}>
            <TouchableWithoutFeedback onPress={() => this.focusOnInput('email')}>
              <View>
              <Text style={[styles.label, this.state.email.length > 0 ? styles.addOpacity : null]}>Email</Text>
              </View>
            </TouchableWithoutFeedback>
            <InputGroup style={StyleSheet.flatten(styles.formGroup)}>
              <Input ref='email'  style={StyleSheet.flatten(styles.formInput)} onChangeText={(email) => this.validateEmailInput(email)}/>
            </InputGroup>
          </Row>
        </Grid>
        <ResetMyPasswordButton style={[styles.formBtn, this.checkValidations() ? styles.validationPassed : null ]} onPress={() => this.forgotPasswordEmail()}/>
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
          <Image source={backgroundShadow} style={styles.bgShadow} />
            <View style={{height:50}}>
              <View style={styles.header} >
                <Button transparent onPress={this.goBack}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Forgot Password</Text>
              </View>
            </View>
            <StyleProvider style={getTheme(glluTheme)}>
            {this.state.emailWasSent?this.renderEmailSent():this.renderBeforeEmailSent()}
            </StyleProvider>
          </Image>
        </View>
      </Container>
    );
  }

}



function bindAction(dispatch) {
  return {
      forgotPassword: (email) => dispatch(forgotPassword(email)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(forgotPasswordPage);
