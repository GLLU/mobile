import React, {Component} from 'react';
import {
  StyleSheet, Alert, Linking, Text, View, Image, FlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import SocialShare from '../../lib/social';
import {
  SUPPORT_EMAIL,
  EMAIL_URL,
  TERMS_URL,
  PRIVACY_URL,
  COPYRIGHT_URL,
  RATE_US_URL
} from '../../constants';
import { formatInvitationMessage } from "../../lib/messages/index";
import asScreen from "../common/containers/Screen"
import Header from "../common/containers/ModalHeader";
import FullscreenView from "../common/containers/FullscreenView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    backgroundColor: 'transparent',
    flex:1,
    flexDirection:'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#000',
    textAlign: 'left'
  },
  headerArrow: {
    color: '#000'
  },
  backIcon: {
    color: '#000'
  },
  listItem: {
    flexDirection:'row',
    height:60,
    alignItems:'center',
    paddingLeft:10
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
  }
});

const iconShare = require('../../../images/icons/share.png');
const iconContact = require('../../../images/icons/contact.png');
const iconTerms = require('../../../images/icons/terms.png');
const iconPrivacy = require('../../../images/icons/privacy.png');
const iconCopyright = require('../../../images/icons/copyright.png');
const iconLogout = require('../../../images/icons/logout.png');
const iconRateUs = require('../../../images/icons/rate_us.png');

class SettingsScreen extends Component {
  static propTypes = {
    navigation: React.PropTypes.object,
    back: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.renderListItem=this.renderListItem.bind(this);
    this.getSettingsConfiguration=this.getSettingsConfiguration.bind(this);
    this.state={
      settings:this.getSettingsConfiguration()
    }
  }

  getSettingsConfiguration(){
    return [
      {
        text:'Invite your Friends',
        icon:iconShare,
        onPress:this._onInviteFriendsClick.bind(this)
      },
      {
        text:'Contact Us',
        icon:iconContact,
        onPress:this.handleOpenLink.bind(this, EMAIL_URL, 'email')
      },
      {
        text:'Terms of Service',
        icon:iconTerms,
        onPress:this.handleOpenLink.bind(this, TERMS_URL)
      },
      {
        text:'Privacy Policy',
        icon:iconPrivacy,
        onPress:this.handleOpenLink.bind(this, PRIVACY_URL)
      },
      {
        text:'Copyrights',
        icon:iconCopyright,
        onPress:this.handleOpenLink.bind(this, COPYRIGHT_URL)
      },
      {
        text:'Rate Us',
        icon:iconRateUs,
        onPress:this.handleOpenLink.bind(this, RATE_US_URL)
      },
      {
        text:'Log Out',
        icon:iconLogout,
        onPress:this.handleLogout.bind(this)
      },

    ]
  }

  _onInviteFriendsClick() {
    this.props.logEvent('SettingsScreen', {name: 'Invite your friends click'});
    const message=SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  handleOpenLink(url, type = 'link') {
    this.props.logEvent('SettingsScreen', { name: 'Link click', url });
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
        if (type === 'email') {
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
    this.props.logEvent('SettingsScreen', { name: 'Logout click' });
    this.props.logout()
      .then(()=>this.props.resetTo('splashscreen'))
      .catch((err)=>console.log(err));
  }

  renderListItem({item}){
    return(
      <TouchableOpacity onPress={item.onPress}>
        <View style={styles.listItem}>
          <Image style={styles.listItemThumbnail} small square source={item.icon} />
          <Text style={styles.listItemText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FullscreenView style={{backgroundColor: 'white'}}>
        <Header title='Settings' goBack={this.props.goBack}/>
        <FlatList
          data={this.state.settings}
          keyExtractor={(item, index) => index}
          renderItem={this.renderListItem}
        />
      </FullscreenView>
    );
  }
}

function bindAction(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => {
  return {
    shareToken: state.user.invitation_share_token
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(SettingsScreen));
