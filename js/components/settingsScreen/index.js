import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
import { Container, Header, Content, View, Thumbnail, Icon, Button, List, Title, ListItem, Text } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { navigateTo } from '../../actions';
import _ from 'lodash';
import SocialShare from '../../lib/SocialShare';

import glluTheme from '../../themes/gllu-theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  backIcon: {
    color: '#000'
  },
  listItem: {
    padding: 25,
  },
  listItemThumbnail: {
    marginHorizontal: 10,
  },
  listItemText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  }
});

const iconShare = require('../../../images/icons/original-share.png');
const iconContact = require('../../../images/icons/original-contact.png');
const iconTerms = require('../../../images/icons/original-terms.png');
const iconPrivacy = require('../../../images/icons/original-privacy.png');
const iconLogout = require('../../../images/icons/original-logout.png');

class SettingsScreen extends BasePage {
  static propTypes = {
    navigation: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    SocialShare.share('facebook');
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Header>
          <Button transparent onPress={() => this._handleBack()}>
            <Icon style={styles.backIcon} name="ios-arrow-back" />
          </Button>
          <Title style={glluTheme.headerTitleStyle}>Settings</Title>
        </Header>
        <Content style={{backgroundColor: '#FFFFFF'}}>
          <List>
            <ListItem style={styles.listItem} onPress={this.handleShare}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconShare} />
                <Text style={styles.listItemText}>Invite your Friends</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconContact} />
                <Text style={styles.listItemText}>Contact Us</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconTerms} />
                <Text style={styles.listItemText}>Terms of Service</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconPrivacy} />
                <Text style={styles.listItemText}>Privacy Policy</Text>
            </ListItem>
        </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, bindAction)(SettingsScreen);
