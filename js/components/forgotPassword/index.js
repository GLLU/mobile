
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";

import glluTheme from '../../themes/gllu-theme';
import { emailRule } from '../../validators';
import styles from './styles';

import { forgotPassword } from '../../actions/user';

const { popRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');


class forgotPasswordPage extends BasePage {

  static propTypes = {
    forgotPassword: React.PropTypes.func,
    popRoute: React.PropTypes.func,
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
          this.setState({emailWasSent: true});
          console.log('email',email)
          this.props.forgotPassword(email);
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

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  focusOnInput(refAttr) {
    this.refs[refAttr]._textInput.focus();
  }

  render() {
      if(this.state.emailWasSent){
          return (
              <Container theme={glluTheme}>
                  <View style={styles.container}>
                      <Image source={background} style={styles.shadow} blurRadius={5}>
                          <Image source={backgroundShadow} style={styles.bgShadow} />
                          <Header style={styles.header} >
                              <Button transparent onPress={() => this.popRoute()}>
                                  <Icon style={styles.headerArrow} name="ios-arrow-back" />
                              </Button>
                              <Title style={styles.headerTitle}>Forgot Password</Title>
                          </Header>
                          <Content scrollEnabled={false}>
                              <View style={styles.instuctionsContainer}>
                                  <Text style={styles.instuctions}>You will get an email shortly to recover your password</Text>
                              </View>
                          </Content>
                      </Image>
                  </View>
              </Container>
          );
      }

    return (
      <Container theme={glluTheme}>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={5}>
          <Image source={backgroundShadow} style={styles.bgShadow} />
          <Header style={styles.header} >
            <Button transparent onPress={() => this.popRoute()}>
              <Icon style={styles.headerArrow} name="ios-arrow-back" />
            </Button>
            <Title style={styles.headerTitle}>Forgot Password</Title>
          </Header>
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
                  Reset My Password
                </Button>
          </Content>
          </Image>
        </View>
      </Container>
    );
  }

}



function bindAction(dispatch) {
  return {
      forgotPassword: (email) => dispatch(forgotPassword(email)),
      popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(forgotPasswordPage);
