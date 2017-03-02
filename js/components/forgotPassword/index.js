
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Platform} from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";
import glluTheme from '../../themes/gllu-theme';
import { emailRule } from '../../validators';
import { forgotPassword } from '../../actions/user';

const { popRoute } = actions;
const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');

const deviceHeight = Dimensions.get('window').height;
const MK = require('react-native-material-kit');
const {
  MKColor,
} = MK;
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
  icons: {
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  formItem: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderColor: 'rgba(192,192,192, .3)',
    height: 50,
    paddingLeft: 0,
    alignItems: 'flex-end',
    marginTop: 20
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    paddingLeft: 0
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    width: 100
  },
  addOpacity: {
    opacity: 0.8
  },
  formInput: {
    flex: 1,
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 12 : 0,
    alignItems: 'stretch',
    color: '#FFFFFF',
    marginLeft: 10,
    top: (Platform.OS === 'ios') ? 0 : 8,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: (Platform.OS === 'ios') ? 20 : 0,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
    backgroundColor: MKColor.Teal,
    opacity: 1
  },
  instuctionsContainer: {
    flex: 1,
    marginTop: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center'
  },
  instuctions: {
    width: 300,
    height: (Platform.OS === 'ios') ? 40 : 50,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center'
  },
});