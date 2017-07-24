import React, {Component} from 'react';
import {StyleSheet, Alert, Linking, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import SocialShare from '../../lib/social';
import {
  SUPPORT_EMAIL,
  EMAIL_URL,
  TERMS_URL,
  PRIVACY_URL,
  COPYRIGHT_URL,
  RATE_US_URL,
} from '../../constants';

import {formatInvitationMessage} from '../../lib/messages/index';
import FullscreenView from '../common/containers/FullscreenView';

const iconShare = require('../../../images/icons/share.png');
const iconContact = require('../../../images/icons/contact.png');
const iconTerms = require('../../../images/icons/terms.png');
const iconPrivacy = require('../../../images/icons/privacy.png');
const iconCopyright = require('../../../images/icons/copyright.png');
const iconLogout = require('../../../images/icons/logout.png');
const iconRateUs = require('../../../images/icons/rate_us.png');
const iconBlockedUsers = require('../../../images/icons/blocked-users-green.png');

class SettingsScreen extends Component {
  static propTypes = {
    navigation: React.PropTypes.object,
    back: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.getSettingsConfiguration = this.getSettingsConfiguration.bind(this);
    this._navigateToBlockedUsers = this._navigateToBlockedUsers.bind(this);
    this.state = {
      settings: this.getSettingsConfiguration(),
    };
  }

  getSettingsConfiguration = () => {
    const { logout } = this.props;
    return [
      {
        text: 'Invite your Friends',
        icon: iconShare,
        onPress: this._onInviteFriendsClick,
      },
      {
        text: 'Contact Us',
        icon: iconContact,
        onPress: this.handleOpenLink.bind(this, EMAIL_URL, 'email'),
      },
      {
        text: 'Terms of Service',
        icon: iconTerms,
        onPress: this.handleOpenLink.bind(this, TERMS_URL),
      },
      {
        text: 'Privacy Policy',
        icon: iconPrivacy,
        onPress: this.handleOpenLink.bind(this, PRIVACY_URL),
      },
      {
        text: 'Copyrights',
        icon: iconCopyright,
        onPress: this.handleOpenLink.bind(this, COPYRIGHT_URL),
      },
      {
        text: 'Rate Us',
        icon: iconRateUs,
        onPress: this.handleOpenLink.bind(this, RATE_US_URL),
      },
      {
        text: 'Blocked Users',
        icon: iconBlockedUsers,
        onPress: this._navigateToBlockedUsers
      },
      {
        text: 'Log Out',
        icon: iconLogout,
        onPress: logout,
      },

    ];
  }
  _navigateToBlockedUsers() {
    const {logEvent, navigateTo} = this.props;
    logEvent('SettingsScreen', {name: 'Blocked Users click'});
    navigateTo('blockedUsersScreen')
  }

  _onInviteFriendsClick = () => {
    this.props.logEvent('SettingsScreen', { name: 'Invite your friends click' });
    const message = SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  handleOpenLink(url, type = 'link') {
    this.props.logEvent('SettingsScreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
        if (type === 'email') {
          Alert.alert(
            '',
            `Sorry, but it seems you don't have an email client enabled in this device. You can email us to ${SUPPORT_EMAIL}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('Alert OK pressed');
                },
              },
            ]
          );
        }
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderListItem({ item }) {
    return (
      <TouchableOpacity onPress={item.onPress}>
        <View style={styles.listItem}>
          <Image style={styles.listItemThumbnail} small square source={item.icon}/>
          <Text style={styles.listItemText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { onBack } = this.props;

    return (
    <View>
      {this.state.settings.map(item => this.renderListItem({item}))}
    </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#000',
    textAlign: 'left',
  },
  headerArrow: {
    color: '#000',
  },
  backIcon: {
    color: '#000',
  },
  listItem: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 10,
  },
  listItemThumbnail: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  },
});

