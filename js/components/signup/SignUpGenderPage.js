import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View,StyleSheet } from 'react-native';
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


  handleGenderPress(gender) {
    this.props.logEvent(`GenderSelectScreen`, { name: 'Gender click', gender });
    this.props.navigateTo('signupemail', {gender:gender});
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
