import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View} from 'react-native';
import BasePage from "../common/base/BasePage";

class BadNavigationScreen extends BasePage {

  render() {
    const {routes,index} = this.props.navigationStack;
    this.logEvent('BadNavigationScreen', {name: `Should have reached to '${routes[index].routeName}'`});
    this.goBack();
    return <View/>;
  }
}

const mapStateToProps = state => ({
  navigationStack: state.cardNavigation,
});

export default connect(mapStateToProps)(BadNavigationScreen);
