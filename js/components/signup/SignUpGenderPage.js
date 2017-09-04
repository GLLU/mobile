import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, KeyboardAvoidingView, WebView } from 'react-native';
import { Container, Content, StyleProvider, getTheme } from 'native-base';
import i18n from 'react-native-i18n';
import asScreen from '../common/containers/Screen'
import styles from './styles'
import glluTheme from '../../themes/gllu-theme';
import Header from "../common/headers/Header";

const background = require('../../../images/backgrounds/man-female_screen2.png');

class SignUpGenderPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
    };
  }

  signUpWithInstagram(gender) {
    const { instagramSignIn, resetTo, navigation } = this.props
    const {accessToken} = navigation.state.params
    instagramSignIn(accessToken, gender).then(() => {
      resetTo('feedscreen');
    }).catch(err => console.log('instagram login Error', err));
  }

  handleGenderPress(gender) {
    const { navigateTo, logEvent, navigation } = this.props
    logEvent(`GenderSelectScreen`, {name: 'Gender click', gender});
    if (navigation.state.params.signupBy === 'email') {
      navigateTo('signupemail', {gender: gender});
    } else {
      this.signUpWithInstagram(gender)
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={0}>
            <Header title='Choose Your Gender' goBack={this.props.goBack}/>
            <StyleProvider style={getTheme(glluTheme)}>
            <Content scrollEnabled={false}>
              <View style={styles.genderSelectContainer}>
                <TouchableOpacity onPress={this.handleGenderPress.bind(this, 'female')}>
                  <View style={styles.genderBtnContainer}>
                    <Image
                      source={require('../../../images/genders/female.png')}
                      style={styles.genderImage}
                    />
                    <Text style={styles.genderLabel}>{i18n.t('FEMALE')}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleGenderPress.bind(this, 'male')}>
                  <View style={styles.genderBtnContainer}>
                    <Image
                      source={require('../../../images/genders/male.png')}
                      style={styles.genderImage}
                    />
                    <Text style={styles.genderLabel}>{i18n.t('MALE')}</Text>
                  </View>
                </TouchableOpacity>
               </View>
            </Content>
            </StyleProvider>
          </Image>
        </View>
      </Container>
    );
  }

}

export default asScreen(SignUpGenderPage);
