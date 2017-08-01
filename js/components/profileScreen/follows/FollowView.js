import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fonts from '../../../styles/Fonts.styles';
import Colors from '../../../styles/Colors.styles';
const styles = StyleSheet.create({
  followBtn: {
    backgroundColor: Colors.secondaryColor,
    height: 25,
    justifyContent: 'center',
    margin: 5,
  },
  followText: {
    textAlign: 'center',
    fontFamily: Fonts.contentFont,
    color: Colors.white,
  },
  unfollowBtn: {
    backgroundColor: 'transparent',
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
  },
  unfollowText: {
    textAlign: 'center',
    fontFamily: Fonts.contentFont,
    color: Colors.secondaryColor,
  },
});

class FollowView extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    onPress: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleFollowPress = this.handleFollowPress.bind(this);
  }

  handleFollowPress() {
    this.props.onPress(this.props.user, !this.props.user.isFollowing)
  }

  renderUnfollowButton() {
    return (
      <TouchableOpacity style={[styles.unfollowBtn,this.props.style]} onPress={this.handleFollowPress}>
        <Text style={styles.unfollowText}>Unfollow</Text>
      </TouchableOpacity>
    )
  }

  renderFollowButton() {
    return (
      <TouchableOpacity style={[styles.followBtn ,this.props.style]} onPress={this.handleFollowPress}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return this.props.user.isFollowing ? this.renderUnfollowButton() : this.renderFollowButton();
  }
}

export default FollowView