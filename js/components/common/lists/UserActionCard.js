// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import FollowView from '../../profileScreen/follows/FollowView';
import { connect } from 'react-redux';
import { followUpdate, unFollowUpdate } from '../../../actions/follows';
import { noop } from 'lodash';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';
import Fonts from '../../../styles/Fonts.styles';
import Colors from '../../../styles/Colors.styles';
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth/3,
    padding: generateAdjustedSize(12),
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  textContainer: {
    flexDirection: 'column',
    marginVertical: 4,
  },

  followUsername: {
    color: Colors.black,
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.contentFont,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 15,
  },
  photo: {
    alignSelf: 'center',
    width: generateAdjustedSize(80),
    height: generateAdjustedSize(80),
    borderRadius: generateAdjustedSize(40),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  followView: {
    width: generateAdjustedSize(70),
    height: generateAdjustedSize(25),
    alignSelf: 'center',
  },
  unFollowBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.lightGreen
  },
  followBtn: {
    backgroundColor: Colors.lightGreen,
    borderWidth: 0
  },
  followViewContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: generateAdjustedSize(30)
  }
});

type Props = {
  username: string,
  isMe: boolean,
  avatar: object,
  id: number,
  isFollowing: boolean,
  navigateTo: (object) => void,
  followUpdate: () => void,
  unFollowUpdate: () => void
};

class UserActionCard extends Component {

  props: Props;

  static defaultProps = {
    navigateTo: noop,
  }

  constructor(props) {
    super(props);
    this.renderFollowText = this.renderFollowText.bind(this);
    this.renderFollowView = this.renderFollowView.bind(this);
    this.onFollowPress = this.onFollowPress.bind(this);
    this._onUserPress = this._onUserPress.bind(this);
  }

  _onUserPress() {
    const { navigateTo, id } = this.props;
    navigateTo('profileScreen', { userId: id });
  }

  onFollowPress(user, shouldFollow) {
    const { followUpdate, unFollowUpdate } = this.props;
    if (shouldFollow) {
      followUpdate(user.id);
    } else {
      unFollowUpdate(user.id);
    }
  }

  renderFollowText() {
    return (
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.followUsername}>@{this.props.username}</Text>
      </View>
    );
  }

  renderFollowView() {
    const { isMe, isFollowing, id } = this.props;
    if (isMe) {
      return <View name="can't follow me" style={styles.followView} />;
    }
    return (
    <View style={styles.followViewContainer}>
      <FollowView
      onPress={this.onFollowPress} style={styles.followView} unFollowBtnStyle={styles.unFollowBtn} followBtnStyle={styles.followBtn}
      user={{ id, isFollowing }} />
    </View>
    );
  }

  render() {
    const { avatar } = this.props;
    return (
      <TouchableOpacity onPress={this._onUserPress} style={[styles.container, this.props.style]}>
        <View style={styles.photoContainer}>
          <Image resizeMode="cover" source={{ uri: avatar.url }} style={styles.photo} />
        </View>
        {this.renderFollowView()}
        {this.renderFollowText()}
      </TouchableOpacity>
    );
  }
}

function bindAction(dispatch) {
  return {
    followUpdate: id => dispatch(followUpdate(id)),
    unFollowUpdate: id => dispatch(unFollowUpdate(id)),
  };
}

export default connect(null, bindAction)(UserActionCard);
