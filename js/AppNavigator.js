import React, { Component } from 'react';
import { View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'
import SpinnerClothing from './components/loaders/SpinnerClothing';
import ErrorHandler from './components/errorHandler';
import { StyleSheet } from 'react-native';
import Analytics from './lib/analytics/Analytics';
import CardStack from './routes'
import { addNavigationHelpers } from "react-navigation";

const {
  popRoute,
} = actions;


const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    padding: 10,
    paddingRight: 0,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});

class AppNavigator extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Analytics.logEvent('Android back button click');
      let routes = this.props.navigation.routes;
      if (routes[routes.length - 1].key === 'splashscreen' || routes[routes.length - 1].key === 'feedscreen' || routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }
      this.props.popRoute(this.props.navigation.key);
      return true;
    });

    Analytics.setUser(this.props.user);
    Analytics.trackAppLoaded();
  }

  componentWillUnmount() {
    Analytics.endTrackAppLoaded();
  }

  popRoute() {
    this.props.popRoute();
  }

  render() {
    const {navigationState, dispatch} = this.props;
    console.log(`navigation!`, this.props);
    return (
      <View style={{flex: 1}}>
        <CardStack navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}/>
        {this.props.isLoading ? <SpinnerSwitch /> : null}
        {this.props.isProcessing ? <SpinnerClothing /> : null}
        {this.props.fatal_error ? <ErrorHandler /> : null}
        {this.props.warning ? <ErrorHandler /> : null}
        {this.props.info ? <ErrorHandler /> : null}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    dispatch,
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => {
  const isLoading = state.loader.loading || false;
  const isProcessing = state.loader.processing || false;
  const isError = state.errorHandler.error || false;
  const isWarning = state.errorHandler.warning || false;
  const isInfo = state.errorHandler.info || false;
  return ({
    navigationState: state.cardNavigation,
    user: state.user,
    isLoading: isLoading,
    isProcessing: isProcessing,
    error: isError,
    warning: isWarning,
    info: isInfo,
  });
};

export default connect(mapStateToProps, bindAction)(AppNavigator);
