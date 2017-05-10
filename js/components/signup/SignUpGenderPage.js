/**
 * Created by yonatanitzhaky on 1/9/17.
 */

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View,StyleSheet } from 'react-native';
import { Container, Header, Button, Title, Content,  Icon } from 'native-base';
import BasePage from '../common/BasePage';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';

import { emailSignUp } from '../../actions/user';


import styles from './styles';

const { popRoute, pushRoute } = actions;

const background = require('../../../images/backgrounds/man-female_screen2.png');
const backgroundShadow = require('../../../images/background-shadow-70p.png');

class SignUpGenderPage extends BasePage {

  static propTypes = {
    popRoute: React.PropTypes.func,
    emailSignUp: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      gender: '',
    };

  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }


  pushRoute(route, gender) {
    this.props.pushRoute({ key: route, index: 1, gender: gender }, this.props.navigation.key);
  }

  handleGenderPress(gender) {
    this.logEvent(`GenderSelectScreen`, { name: 'Gender click', gender });
    this.pushRoute('signupemail', gender);
  }

  handleBackPress() {
    this.logEvent('GenderSelectScreen', { name: 'back to signup clicks' });
    this.popRoute();
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image source={background} style={styles.shadow} blurRadius={0}>
            <View style={{height:50}}>
              <View style={styles.header} >
                <Button transparent onPress={() => this.popRoute()}>
                  <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
                </Button>
                <Text style={styles.headerTitle}>Sign up</Text>
              </View>
            </View>
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
          </Image>
        </View>
      </Container>
    );
  }

}

function bindAction(dispatch) {
  return {
    emailSignUp: (data) => dispatch(emailSignUp(data)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpGenderPage);
