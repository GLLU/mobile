import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, Text, View, StyleSheet, TextInput } from 'react-native';
import { Container, Content, StyleProvider, getTheme } from 'native-base';
import IconB from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";
import i18n from 'react-native-i18n';

import glluTheme from '../../themes/gllu-theme';
import { emailRule } from '../../validators';
import styles from './styles';

import { forgotPassword } from '../../actions/user';
import Header from "../common/headers/Header";
import SolidButton from "../common/buttons/SolidButton";
const background = require('../../../images/backgrounds/forgot-password-background.png');
import asScreen from "../common/containers/Screen"


class forgotPasswordPage extends Component {

  static propTypes = {
    forgotPassword: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.forgotPasswordEmail = this.forgotPasswordEmail.bind(this);
    this.validateEmailInput = this.validateEmailInput.bind(this);
    this.state = {
      email: '',
      emailValid: 'times',
      emailWasSent: false
    };

  }

  forgotPasswordEmail() {
    let {email} = this.state;
    if (this.checkValidations()) {
      this.props.forgotPassword(email);
      this.setState({emailWasSent: true});
    }
  }

  checkValidations() {
    let {emailValid} = this.state;
    return (emailValid !== 'times')
  }

  validateEmailInput(email) {
    emailRule.validate(email, (err) => {
      this.setState({email, emailValid: !err ? 'check' : 'times'});
    });
  }

  renderEmailSent() {
    return (
      <Content scrollEnabled={true}>
        <View style={styles.instuctionsContainer}>
          <Text style={styles.instuctions}>You will get an email shortly to recover your password</Text>
        </View>
      </Content>
    );
  }

  renderBeforeEmailSent() {
    return (
      <Content scrollEnabled={true}>
        <View style={styles.instuctionsContainer}>
          <Text style={styles.instuctions}>{i18n.t('PASSWORD_INSTRUCTIONS')}</Text>
        </View>
        <Grid>
          <Row style={styles.formItem}>
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              placeholderTextColor='lightgrey'
              autoFocus={true}
              style={styles.formInput}
              onChangeText={this.validateEmailInput}/>
            {this.state.email.length > 0 ?
              <IconB size={20} color={'#009688'} name={this.state.emailValid} style={styles.uploadImgIcon}/> : null}
          </Row>
        </Grid>
        <SolidButton label={i18n.t('RESET_PASSWORD')}
                     style={[styles.formBtn, this.checkValidations() ? styles.validationPassed : null]}
                     onPress={this.forgotPasswordEmail}/>
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
            <Header title='Forgot Password?' goBack={this.props.goBack}/>
            <StyleProvider style={getTheme(glluTheme)}>
              {this.state.emailWasSent ? this.renderEmailSent() : this.renderBeforeEmailSent()}
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

export default connect(mapStateToProps, bindAction)(asScreen(forgotPasswordPage));
