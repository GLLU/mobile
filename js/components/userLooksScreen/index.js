import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Header, View, Icon, Title, Button, Text } from 'native-base';
import styles from './styles';
import {
  getUserLooksData,
  getUserLooksById,
  popRoute
} from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import UserLooks from './UserLooks';

class UserLookScreen extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    userId: React.PropTypes.number,
    pushRoute: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  componentWillMount() {
    this.props.getUserLooksById(this.props.userId);
  }

  render() {
    return (
      <Container style={styles.container} theme={glluTheme}>
        <Header style={styles.header}>
          <Button transparent onPress={() => this._PopRoute()}>
            <Icon style={styles.headerArrow} name="ios-arrow-back" />
          </Button>
          <Title
            style={styles.headerTitle}
          >
            {this.props.isMyProfile ? 'My Items' : this.props.userName+"'s Items"} <Text style={styles.headerTitleNumber}>{this.props.looksCount}</Text></Title>
        </Header>
        <Content scrollEnabled={false}>
          <View>
            <UserLooks
              userLooks={this.props.userLooks}
              userId={this.props.userId} />
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    getUserLooksData: name => dispatch(getUserLooksData(name)),
    getUserLooksById: (id, query) => dispatch(getUserLooksById(id, query)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  currLookScreenId: state.userLooks.currId,
  userLooks: state.userLooks.userLooksData,
  isMyProfile: state.userLooks.isMyProfile,
  userName: state.userLooks.name,
  looksCount: state.userLooks.meta.total_count
});

export default connect(mapStateToProps, bindActions)(UserLookScreen);
