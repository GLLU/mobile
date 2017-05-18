import React, { Component } from 'react';
import { View, BackAndroid, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'
import SpinnerClothing from './components/loaders/SpinnerClothing';
import ErrorHandler from './components/errorHandler';
import { StyleSheet } from 'react-native';
import Analytics from './lib/analytics/Analytics';
import CardStack from './routes'
import { addNavigationHelpers } from "react-navigation";
import * as _ from "lodash";


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
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Analytics.logEvent('Android back button click');
      const {dispatch,navigationState} = this.props;
      const navigation = this.generateNaivgationObject(dispatch,navigationState);
      const {routes} = navigation.state;
      if(routes.length>1){
        navigation.goBack();
        return true;
      }
      else{
        Analytics.logEvent('Exiting App');
        BackAndroid.exitApp();
      }
    });

    Analytics.setUser(this.props.user);
    Analytics.trackAppLoaded();
  }

  componentWillUnmount() {
    Analytics.endTrackAppLoaded();
  }

  generateNaivgationObject(dispatch,navigationState){
    return addNavigationHelpers({
      dispatch,
      state: navigationState,
    })
  }

  render() {
    const {dispatch,navigationState} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='default'/>
        <CardStack navigation={this.generateNaivgationObject(dispatch,navigationState)}/>
        {this.props.isLoading ? <SpinnerSwitch /> : null}
        {this.props.isProcessing ? <SpinnerClothing /> : null}
        {this.props.fatalError ? <ErrorHandler /> : null}
        {this.props.warning ? <ErrorHandler /> : null}
        {this.props.info ? <ErrorHandler /> : null}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = state => {
  const isLoading = state.loader.loading || false;
  const isProcessing = state.loader.processing || false;
  const isError = state.errorHandler.error || false;
  const isFatalError = state.errorHandler.fatal_error || false;
  const isWarning = state.errorHandler.warning || false;
  const isInfo = state.errorHandler.info || false;
  return ({
    navigationState: state.cardNavigation,
    user: state.user,
    isLoading: isLoading,
    isProcessing: isProcessing,
    error: isError,
    fatalError: isFatalError,
    warning: isWarning,
    info: isInfo,
  });
};

export default connect(mapStateToProps, bindAction)(AppNavigator);
