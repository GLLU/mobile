import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Header, View, Icon, Title, Button, Text } from 'native-base';
import styles from './styles';
import { getUserLooksData, popRoute } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import UserLooks from './UserLooks';

class UserLookScreen extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    pushRoute: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
          <View>
            <UserLooks userId={this.props.currLookScreenId} />
          </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    getUserLooksData: name => dispatch(getUserLooksData(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  currLookScreenId: state.userLooks.currId,
  isMyProfile: state.userLooks.isMyProfile,
  userName: state.userLooks.name,
  looksCount: state.userLooks.looksCount
});

export default connect(mapStateToProps, bindActions)(UserLookScreen);
