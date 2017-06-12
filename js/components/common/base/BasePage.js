import React, { Component } from 'react';
import { Alert } from 'react-native';
import BaseComponent from './BaseComponent';
import {NavigationActions} from "react-navigation";

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.navigateTo=this.navigateTo.bind(this);
    this.goBack=this.goBack.bind(this);
    this.resetTo=this.resetTo.bind(this);
    this.resetWithPayload=this.resetWithPayload.bind(this);
  }

  setLeaveBreadcrumb(props) {
    this.bugsnag.leaveBreadcrumb("Page", {
      type: 'navigation',
      component: this.constructor.name,
      props: props,
    });
  }

  resetTo(route) {
    this.resetWithPayload({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
  }

  resetWithPayload(payload){
    this.props.navigation.dispatch(new NavigationActions.reset(payload))
  }

  navigateTo(route,params) {
    this.props.navigation.navigate(route, params)
  }

  goBack(withConfirmation = false) {
    this.logEvent(this.constructor.name, { name: `user pressed back`});
    if (withConfirmation===true) {
      Alert.alert(
        '',
        'Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
            },
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              this.goBack(false);
            }
          }
        ]
      );
    } else {
      this.props.navigation.goBack();
    }
  }
}

export default BasePage;
