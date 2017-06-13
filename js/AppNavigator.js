import React, { Component } from 'react';
import { View, BackAndroid, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SpinnerClothing from './components/loaders/SpinnerClothing';
import ErrorHandler from './components/errorHandler';
import ParisMessages from './components/parisMessages';
import { StyleSheet } from 'react-native';
import Analytics from './lib/analytics/Analytics';
import CardStack from './routes'
import { addNavigationHelpers } from "react-navigation";
import {expireCache} from './lib/cache/FSVideoCache'
import { trackScreenByNavigationState } from "./utils/TrackingUtils";


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
    expireCache()
      .then(()=>console.log('removed expired items in cache!'))
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

  componentWillReceiveProps(nextProps){
    if(nextProps.navigationState!==this.props.navigationState){
      trackScreenByNavigationState(nextProps.navigationState,this.props.navigationState)
    }
  }

  render() {
    const {dispatch,navigationState} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='default'/>
        <CardStack navigation={this.generateNaivgationObject(dispatch,navigationState)}/>
        {/*{this.props.isLoading ? <SpinnerSwitch /> : null}*/}
        {this.props.isProcessing ? <SpinnerClothing /> : null}
        {this.props.fatalError ? <ErrorHandler /> : null}
        {this.props.warning ? <ErrorHandler /> : null}
        {this.props.info ? <ErrorHandler /> : null}
        {this.props.parisBottomMessage ? <ParisMessages /> : null}
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
  const isProcessing = state.loader.processing || false;
  const isError = state.errorHandler.error || false;
  const isFatalError = state.errorHandler.fatal_error || false;
  const isWarning = state.errorHandler.warning || false;
  const isInfo = state.errorHandler.info || false;
  const isParisBottomMessage = state.paris.messageBottom || false;
  return ({
    navigationState: state.cardNavigation,
    user: state.user,
    isProcessing: isProcessing,
    error: isError,
    fatalError: isFatalError,
    warning: isWarning,
    info: isInfo,
    parisBottomMessage: isParisBottomMessage,
  });
};

export default connect(mapStateToProps, bindAction)(AppNavigator);
