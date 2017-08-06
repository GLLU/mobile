import React, {Component} from 'react';
import asScreen from '../js/components/common/containers/Screen'
import {View, Image, Linking, Platform, Dimensions, TouchableOpacity} from 'react-native';
import Spinner from '../js/components/loaders/Spinner';

import {connect} from 'react-redux';
import {checkLogin} from '../js/actions/user';

const background = require('../images/backgrounds/iphone-splash_screen.png');
const deviceWidth = Dimensions.get('window').width;

class Splash extends Component {

  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentWillMount() {
    this.checkLogin();
  }

  checkLogin() {
    this.props.checkLogin()
      .then(() => {
      debugger;
        this.props.resetTo('feedscreen')
      })
      .catch(this.props.resetTo('splashscreen'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAppState !== this.props.currentAppState) {
      if (this.props.currentAppState === 'active') {
        this._root.seek(0)
      }
      this.setState({ repeat: nextProps.currentAppState === 'active' })
    }
  }

  render() {

    return (
      <Image
        source={background} resizeMode={'stretch'}
        style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </Image>
    );
  }
}

function bindAction(dispatch) {
  return {
    checkLogin: (user) => dispatch(checkLogin(user)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  showTutorial: state.user.showTutorial
});

export default connect(mapStateToProps, bindAction)(asScreen(Splash));
