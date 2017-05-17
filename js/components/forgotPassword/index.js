
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback,Text, View, StyleSheet } from 'react-native';
import { Container, Header, Button, Title, Content, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";

import glluTheme from '../../themes/gllu-theme';
import { emailRule } from '../../validators';
import styles from './styles';

import { forgotPassword } from '../../actions/user';

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
              <Text style={[styles.label, this.state.email.length > 0 ? styles.addOpacity : null]}>Email</Text>
            </TouchableWithoutFeedback>
            <InputGroup style={styles.formGroup}>
              <Input ref='email'  style={styles.formInput} onChangeText={(email) => this.validateEmailInput(email)}/>
            </InputGroup>
          </Row>
        </Grid>
        <Button color='lightgrey' style={[styles.formBtn, this.checkValidations() ? styles.validationPassed : null ]} onPress={() => this.forgotPasswordEmail()}>
          <Text>Reset My Password</Text>
        </Button>
      </Content>
    );
  }

  render() {
    return (
      <Container theme={glluTheme}>
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
            {this.state.emailWasSent?this.renderEmailSent():this.renderBeforeEmailSent()}
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
