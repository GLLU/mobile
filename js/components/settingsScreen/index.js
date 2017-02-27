import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Alert, Linking, Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
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
const iconCopyright = require('../../../images/icons/original-copyright.png');

const SUPPORT_EMAIL = 'hello@gllu.com';
const EMAIL_URL = `mailto:${SUPPORT_EMAIL}`;
const TERMS_URL = 'https://www.gllu.com/terms';
const PRIVACY_URL = 'https://www.gllu.com/privacy';
const COPYRIGHT_URL = 'https://www.gllu.com/copyrights';

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

  handleOpenLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
        Alert.alert(
          '',
          `Sorry, but it seems you don't have an email client enabled in this device. You can email us to ${SUPPORT_EMAIL}`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Alert OK pressed');
              }
            }
          ]
        );
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
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
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, EMAIL_URL)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconContact} />
                <Text style={styles.listItemText}>Contact Us</Text>
            </ListItem>
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, TERMS_URL)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconTerms} />
                <Text style={styles.listItemText}>Terms of Service</Text>
            </ListItem>
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, PRIVACY_URL)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconPrivacy} />
                <Text style={styles.listItemText}>Privacy Policy</Text>
            </ListItem>
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, COPYRIGHT_URL)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconCopyright} />
                <Text style={styles.listItemText}>Copyrights</Text>
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
