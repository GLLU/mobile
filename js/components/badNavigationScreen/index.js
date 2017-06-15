import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View} from 'react-native';
import asScreen from "../common/containers/Screen"

class BadNavigationScreen extends Component {

  render() {
    const {routes,index} = this.props.navigationStack;
    this.props.logEvent('BadNavigationScreen', {name: `Should have reached to '${routes[index].routeName}'`});
    this.props.goBack();
    return <View/>;
  }
}

const mapStateToProps = state => ({
  navigationStack: state.cardNavigation,
});

export default connect(mapStateToProps)(asScreen(BadNavigationScreen));
