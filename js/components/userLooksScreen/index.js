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
    userData: React.PropTypes.object,
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
      <Container style={styles.container} theme={glluTheme}>
        <Header style={styles.header}>
          <Button transparent onPress={() => this._PopRoute()}>
            <Icon style={styles.headerArrow} name="ios-arrow-back" />
          </Button>
          <Title style={styles.headerTitle}>{this.props.userData.isMyProfile ? 'My Items' : this.props.userData.name+"'s Items"} <Text style={styles.headerTitleNumber}>{this.props.userData.looksCount}</Text></Title>
        </Header>
        <Content scrollEnabled={false}>
          <View>
            <UserLooks userId={this.props.userData.id} />
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(UserLookScreen);
