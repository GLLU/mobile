
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Button, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const background = require('../../../images/background.jpg');
const logo = require('../../../images/splash-logo.png');
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
} = MK;

const SignUpEmailButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Teal)
  .withTextStyle({
    color: 'white',
    fontWeight: 'normal',
  })
  .withStyle({
    height: 40,
    borderRadius: 0
  })
  .withText('Signup with Email')
  .build();

export default class SplashPage extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  singupWithEmail() {
    console.log('Go To Signup with Email');
  }

  connectWithFB() {
    console.log('Connect with FB')
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>
              <View style={styles.signupContainer}>
                <SignUpEmailButton onPress={() => this.singupWithEmail() } />
                <Text style={styles.label}>Or</Text>
                <Icon.Button style={styles.btnFB} name="facebook" backgroundColor="#3b5998" onPress={this.connectWithFB}>
                  Connect with facebook
                </Icon.Button>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomContainerContent}>Terms of Service and Privacy Policy</Text>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}
