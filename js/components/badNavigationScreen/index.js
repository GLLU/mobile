import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View} from 'react-native';
import { popRoute } from '../../actions';

const BadNavigationScreen = props=>{
  const {index, routes}=props.navigation;
  this.logEvent('BadNavigationScreen', {name: `Should have reached to '${routes[index].key}'`});
  props.popRoute(props.navigation.key);
  return <View/>;
};

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(BadNavigationScreen);
