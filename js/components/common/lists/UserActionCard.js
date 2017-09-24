import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FollowView from '../../profileScreen/follows/FollowView';
import { connect } from 'react-redux';
import { followUpdate, unFollowUpdate } from '../../../actions/follows';
import { noop } from 'lodash';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';
import Fonts from '../../../styles/Fonts.styles';
import Colors from '../../../styles/Colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: generateAdjustedSize(100),
    padding: generateAdjustedSize(12),
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'column',
    marginVertical: 4
  },

  followUsername: {
    color: 'black',
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.contentFont,
    alignSelf: 'center',
    textAlign: 'center',
  },
  photo: {
    alignSelf: 'center',
    width: generateAdjustedSize(60),
    height: generateAdjustedSize(60),
    borderRadius: generateAdjustedSize(30),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  followView: {
    width: generateAdjustedSize(60),
    height: generateAdjustedSize(20),
    alignSelf: 'center'
  },
});

class UserActionCard extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    username: React.PropTypes.string,
    aboutMe: React.PropTypes.string,
    avatar: React.PropTypes.object,
    userId: React.PropTypes.number,
    is_following: React.PropTypes.bool,
    navigateTo: React.PropTypes.func,
  };

  static defaultProps = {
    navigateTo: noop,
  }

  constructor(props) {
    super(props);
    this.renderFollowText = this.renderFollowText.bind(this);
    this.renderFollowView = this.renderFollowView.bind(this);
    this.onFollowPress = this.onFollowPress.bind(this);
  }

  onUserPress() {
    this.props.navigateTo('profileScreen', { userId: this.props.id });
  }

  onFollowPress(user, shouldFollow) {
    if (shouldFollow) {
      this.props.followUpdate(user.id);
    } else {
      this.props.unFollowUpdate(user.id);
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
    const {isMe, isFollowing, id} = this.props
    if (isMe) {
      return <View name="can't follow me" style={styles.followView} />;
    }
    return (<FollowView
      onPress={this.onFollowPress} style={styles.followView}
      user={{ id, isFollowing }} />);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container, this.props.style]}>
        <View style={styles.photoContainer}>
          <Image resizeMode="cover" source={{ uri: this.props.avatar.url }} style={styles.photo} />
        </View>
        {this.renderFollowText()}
        {this.renderFollowView()}
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
