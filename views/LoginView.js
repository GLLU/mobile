'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {loginClicked: false};
    this.loginSuccessful = this.loginSuccessful.bind(this)
  }

  loginSuccessful(data) {
    this.setState({accessToken: data["accessToken"], expirationTime: data["expirationTime"]})

    fetch("http://api.gllu.dev/v1/login/facebook_sign_in.json",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({access_token: data["accessToken"]}),
      })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData){
          this.setState({
            responseData: responseData,
          });
        }
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  }

  render() {
    return(
      <View>
        <Text>
          Access Token: {this.state.accessToken},
          Expiration Time: {this.state.expirationTime}
        </Text>
        <LoginButton
          readPermissions={["email", "public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    this.loginSuccessful(data)
                  }
                )
              }
            }
          }
          onLogoutFinished={() =>
            this.setState({accessToken: '', expirationTime: ''})
          }/>
      </View>
    )
  }
}

module.exports = LoginView;