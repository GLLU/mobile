import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer, Content } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { closeDrawer } from './actions/drawer';
import SplashPage from './components/splashscreen/';
import FeedPage from './components/feedscreen';
import AddItemPage from './components/addItemScreen';
import MyBodyType from './components/myBodyType';
import MyBodyMeasure from './components/myBodyMeasure';
import SignUpPage from './components/signup';
import SignInPage from './components/signin';
import ActivationCodeScreen from './components/activationCodeScreen';
import SignUpGenderPage from './components/signup/SignUpGenderPage.js';
import ForgotPassword from './components/forgotPassword';
import LooksScreen from './components/looksScreen';
import ProfileScreen from './components/profileScreen';
import FollowScreen from './components/profileScreen/follows/followscreen';
import FollowerScreen from './components/profileScreen/follows/followerscreen';
import NotificationsScreen from './components/notificationsscreen';
import SettingsScreen from './components/settingsScreen';
import EditProfile from './components/profileScreen/EditProfile.js';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'
import SpinnerClothing from './components/loaders/SpinnerClothing';
import FinishLookScreen from './components/finishLookScreen';
import ErrorHandler from './components/errorHandler';
import BadNavigationScreen from './components/badNavigationScreen'
import { StyleSheet } from 'react-native';
import myTheme, { statusBarColor } from './themes/base-theme';

import Analytics from './lib/analytics/Analytics';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;



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
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Analytics.logEvent('Android back button click');
      let routes = this.props.navigation.routes
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

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.props.openDrawer()
    }

    if (this.props.drawerState === 'closed') {
      this.props.closeDrawer()
    }

  }

  popRoute() {
    this.props.popRoute();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    const optional = props.scene.route.optional ? props.scene.route.optional: '';
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'activationcode':
        return <ActivationCodeScreen continueTo={props.scene.route} />;
      case 'signupemail':
        return <SignUpPage gender={props.scene.route.gender}/>;
      case 'genderselect':
        return <SignUpGenderPage />;
      case 'signinemail':
        return <SignInPage />;
      case 'forgotpassword':
        return <ForgotPassword />;
      case 'feedscreen':
        return <FeedPage />;
      case 'addItemScreen':
        return <AddItemPage mode={optional ? optional.mode : 'create'}/>;
      case 'finishLookScreen':
        return <FinishLookScreen />;
      case 'myBodyType':
        return <MyBodyType />;
      case 'myBodyMeasure':
        return <MyBodyMeasure />;
      case 'looksScreen':
        return <LooksScreen flatLook={props.scene.route.optional}/>;
      case 'profileScreen':
        return <ProfileScreen key={props.scene.route.optional.user_id} userData={props.scene.route.optional}/>;
      case 'followScreen':
        return <FollowScreen userData={props.scene.route.optional}/>;
      case 'followerScreen':
        return <FollowerScreen userData={props.scene.route.optional}/>;
      case 'notificationsScreen':
        return <NotificationsScreen/>;
      case 'settingsScreen':
        return <SettingsScreen/>;
      case 'editProfileScreen':
        return <EditProfile userData={props.scene.route.optional}/>;
      default :
        return <BadNavigationScreen />;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Drawer
          type="overlay"
          tweenDuration={150}
          content={<Content theme={myTheme} style={StyleSheet.flatten(styles.sidebar)} />}
          tapToClose
          acceptPan={false}
          onClose={() => this.closeDrawer()}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          styles={{
            drawer: {
              shadowColor: '#000000',
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
          }}
          tweenHandler={(ratio) => {  //eslint-disable-line
            return {
              drawer: {shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5},
              main: {
                opacity: (2 - ratio) / 2,
              },
            };
          }}
          negotiatePan
        >
          <StatusBar
            backgroundColor={statusBarColor}
            barStyle="default"
          />
          <NavigationCardStack
            navigationState={this.props.navigation}
            renderOverlay={this._renderOverlay}
            renderScene={this._renderScene}
          />
        </Drawer>
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
    closeDrawer: () => dispatch(closeDrawer()),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => {
  const isLoading = state.loader.loading || false;
  const isProcessing = state.loader.processing || false;
  const isError = state.errorHandler.error || false;
  const isFatalError = state.errorHandler.fatal_error || false;
  const isWarning = state.errorHandler.warning || false;
  const isInfo = state.errorHandler.info || false;
  console.log('isError',isFatalError)
  return ({
    drawerState: state.drawer.drawerState,
    navigation: state.cardNavigation,
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
