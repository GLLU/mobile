// @flow

import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions } from 'react-native';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import I18n from 'react-native-i18n';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import ProfileScreenStat from './ProfileScreenStat';
import ProfileAvatar from '../common/avatars/ProfileAvatar';
import SolidButton from '../common/buttons/SolidButton';

type Props = {
  profilePic: string,
  name: string,
  username: string,
  isFollowing: boolean,
  userid: number,
  isMyProfile: string,
  balance: number,
  stats: any,
  onStatClicked: () => void,
  onBalanceClicked: () => void,
  onLooksClicked: () => void,
  onFollowClicked: () => void,
};

const screenWidth = Dimensions.get('window').width;
const defaultBackground = require('../../../images/backgrounds/profile-screen-background.png');

class ProfileScreenHeader extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    this._handleStatClick = this._handleStatClick.bind(this);
  }

  render(): React.Element<any> {
    const { profilePic, name, username, isFollowing, userid, isMyProfile, onFollowClicked } = this.props;

    return (
      <View style={{ height: 300 }}>
        <Image
          resizeMode={'stretch'} source={defaultBackground}
          style={styles.backgroundImage} />
        <View style={styles.backgroundImage} />
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <ProfileAvatar avatarUrl={profilePic} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{username}</Text>
          {isMyProfile ? null : <SolidButton style={styles.followButton} label={'Follow'} onPress={onFollowClicked} />}
        </View>
        {this._renderStats()}
      </View>
    );
  }

  _renderStats(): React.Element<any> {
    const { following, followers, looks_count } = this.props.stats;
    const { balance, isMyProfile } = this.props;

    const statsAmount = isMyProfile ? 4 : 3;

    return (
      <View
        style={styles.statsRow}>

        {isMyProfile ? <ProfileScreenStat
          title={I18n.t('BALANCE')} number={balance}
          style={{ width: Dimensions.get('window').width / statsAmount }}
          onClick={this._handleBalanceClicked} />
          : null}

        <ProfileScreenStat
          title={I18n.t('FOLLOWERS')} number={followers}
          style={{ width: Dimensions.get('window').width / statsAmount }}
          onClick={() => this._handleStatClick('followerScreen', 'followers', followers)} />

        <ProfileScreenStat
          title={I18n.t('FOLLOWING')} number={following}
          style={{ width: Dimensions.get('window').width / statsAmount }}
          onClick={() => this._handleStatClick('followScreen', 'following', following)} />

        <ProfileScreenStat
          title={I18n.t('LOOKS')} number={looks_count}
          style={{ width: Dimensions.get('window').width / statsAmount }}
          onClick={this._handleLooksClicked} />

      </View>
    );
  }

  _handleStatClick(screenName: string, statClicked: string, count: number) {
    const { isMyProfile, onStatClicked, userid, name } = this.props;

    onStatClicked(screenName, { id: userid, name }, isMyProfile, statClicked, count);
  }

  _handleBalanceClicked = () => {
    const { onBalanceClicked } = this.props;

    onBalanceClicked();
  }

  _handleLooksClicked = () => {
    const { onLooksClicked } = this.props;

    onLooksClicked();
  }

}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 6,
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth,
    height: 300,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  name: {
    color: 'white',
    fontSize: 25,
    fontFamily: Fonts.regularFont,
    marginTop: 5,
  },
  followButton: {
    marginTop: 8,
    backgroundColor: Colors.highlightColor,
    height: 35,
    width: 135,
  },
  username: {
    color: Colors.highlightColor,
    fontSize: 15,
    fontFamily: Fonts.regularFont,
  },
  editBtn: {
    backgroundColor: 'transparent',
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    color: Colors.highlightColor,
  },
  editText: {
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
    color: Colors.highlightColor,
  },

});

export default ProfileScreenHeader;
