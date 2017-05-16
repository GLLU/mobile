import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View,StyleSheet } from 'react-native';
import { Container, Header, Button, Title, Content, Icon, StyleProvider, getTheme } from 'native-base';
import BasePage from '../common/BasePage';
import styles from './styles'
import glluTheme from '../../themes/gllu-theme'

const background = require('../../../images/backgrounds/man-female_screen2.png');

class SignUpGenderPage extends BasePage {

  constructor(props) {
    super(props);

    this.state = {
      gender: '',
    };

  }

  handleGenderPress(gender) {
    this.logEvent(`GenderSelectScreen`, { name: 'Gender click', gender });
    this.navigateTo('signupemail', {gender:gender});
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={0}>
            <View style={{height:50}}>
              <View style={styles.header} >
                <Button transparent onPress={() => this.goBack()}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Sign up</Text>
              </View>
            </View>
            <StyleProvider style={getTheme(glluTheme)}>
            <Content scrollEnabled={false}>
              <View style={styles.genderSelectContainer}>
                <TouchableOpacity onPress={this.handleGenderPress.bind(this, 'female')}>
                  <View style={styles.genderBtnContainer}>
                    <Image
                      source={require('../../../images/female1.png')}
                      style={styles.genderImage}
                    />
                    <Text style={styles.genderLabel}>Female</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleGenderPress.bind(this, 'male')}>
                  <View style={styles.genderBtnContainer}>
                    <Image
                      source={require('../../../images/male1.png')}
                      style={styles.genderImage}
                    />
                    <Text style={styles.genderLabel}>Male</Text>
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

export default SignUpGenderPage;
