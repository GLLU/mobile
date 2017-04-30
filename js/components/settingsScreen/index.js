import React from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Alert, Linking} from 'react-native';
import { Container, Header, Content, View, Thumbnail, Icon, Button, List, Title, ListItem, Text } from 'native-base';
import { connect } from 'react-redux';
import { back, logout } from '../../actions';
import SocialShare from '../../lib/social';
import glluTheme from '../../themes/gllu-theme';
import {
  SUPPORT_EMAIL,
  EMAIL_URL,
  TERMS_URL,
  PRIVACY_URL,
  COPYRIGHT_URL,
  RATE_US_URL
} from '../../constants';

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
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  }
});

const iconShare = require('../../../images/icons/share.png');
const iconContact = require('../../../images/icons/contact.png');
const iconTerms = require('../../../images/icons/terms.png');
const iconPrivacy = require('../../../images/icons/privacy.png');
const iconCopyright = require('../../../images/icons/copyright.png');
const iconLogout = require('../../../images/icons/logout.png');
const iconRateUs = require('../../../images/icons/rate_us.png');

class SettingsScreen extends BasePage {
  static propTypes = {
    navigation: React.PropTypes.object,
    back: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleBack() {
    this.logEvent('SettingsScreen', { name: 'Back click' });
    this.props.back(this.props.navigation.key);
  }

  handleShare() {
    this.logEvent('SettingsScreen', { name: 'Share click' });
    SocialShare.nativeShare(this.props.shareToken);
  }

  handleOpenLink(url, type = 'link') {
    this.logEvent('SettingsScreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
        if (type == 'email') {
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
        }
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleLogout() {
    this.logEvent('SettingsScreen', { name: 'Logout click' });
    this.props.logout();
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Header>
          <Button transparent onPress={this.handleBack.bind(this)}>
            <Icon style={styles.backIcon} name="ios-arrow-back" />
          </Button>
          <Title style={glluTheme.headerTitleStyle}>Settings</Title>
        </Header>
        <Content style={{backgroundColor: '#FFFFFF'}}>
          <List>
            <ListItem style={styles.listItem} onPress={this.handleShare.bind(this)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconShare} />
                <Text style={styles.listItemText}>Invite your Friends</Text>
            </ListItem>
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, EMAIL_URL, 'email')}>
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
            <ListItem style={styles.listItem} onPress={this.handleOpenLink.bind(this, RATE_US_URL)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconRateUs} />
                <Text style={styles.listItemText}>Rate Us</Text>
            </ListItem>
            <ListItem style={styles.listItem} onPress={this.handleLogout.bind(this)}>
                <Thumbnail style={styles.listItemThumbnail} square size={20} source={iconLogout} />
                <Text style={styles.listItemText}>Log Out</Text>
            </ListItem>
        </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    back: key => dispatch(back(key)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    shareToken: state.user.invitation_share_token
  };
};

export default connect(mapStateToProps, bindAction)(SettingsScreen);
