import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import SplashPage from './components/splashscreen/';
import FeedPage from './components/feedscreen';
import AddItemPage from './components/addItemScreen';
import TagItemPage from './components/tagItemScreen';
import SideBar from './components/sideBar';
import MyBodyType from './components/myBodyType';
import MyBodyMeasure from './components/myBodyMeasure';
import SignUpPage from './components/signup';
import SignInPage from './components/signin';
import SignUpGenderPage from './components/signup/SignUpGenderPage.js';
import ForgotPassword from './components/forgotPassword';
import ItemScreen from './components/itemScreen';
import ProfileScreen from './components/profileScreen';
import EditProfile from './components/profileScreen/EditProfile.js';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'

import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }
  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'signupemail':
        return <SignUpPage gender={props.scene.route.gender} />;
      case 'genderselect':
        return <SignUpGenderPage />;
      case 'signinemail':
        return <SignInPage />;
      case 'forgotpassword':
        return <ForgotPassword />;
      case 'feedscreen':
        return <FeedPage />;
      case 'addItemScreen':
        return <AddItemPage />;
      case 'tagItemScreen':
        return <TagItemPage />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      case 'myBodyType':
        return <MyBodyType />;
      case 'myBodyMeasure':
        return <MyBodyMeasure />;
      case 'itemScreen':
        return <ItemScreen flatLook={props.scene.route.optional}/>;
      case 'profileScreen':
        return <ProfileScreen userData={props.scene.route.optional}/>;
      case 'editProfileScreen':
        return <EditProfile userData={props.scene.route.optional}/>;
      default :
        return <Login />;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          type="overlay"
          tweenDuration={150}
          content={<SideBar />}
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
              drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
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
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => {
  const isLoading = state.loader.loading || false;
  return ({
    drawerState: state.drawer.drawerState,
    navigation: state.cardNavigation,
    isLoading: isLoading,
  });
};

export default connect(mapStateToProps, bindAction)(AppNavigator);
