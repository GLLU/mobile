import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';

const styles = StyleSheet.create({
  followBtn: {
    backgroundColor: '#00D7B2',
    height: generateAdjustedSize(25),
    justifyContent: 'center',
    margin: generateAdjustedSize(5),
  },
  followText: {
    textAlign: 'center',
    color: 'white',
    fontSize: generateAdjustedSize(14),
  },
  unfollowBtn: {
    backgroundColor: 'transparent',
    width: generateAdjustedSize(75),
    height: generateAdjustedSize(25),
    justifyContent: 'center',
    margin: generateAdjustedSize(5),
    borderWidth: 2,
    borderColor: '#00D7B2',
  },
  unfollowText: {
    textAlign: 'center',
    color: '#00D7B2',
    fontSize: generateAdjustedSize(14),
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
      <TouchableOpacity style={[styles.unfollowBtn, this.props.style]} onPress={this.handleFollowPress}>
        <Text style={styles.unfollowText}>Unfollow</Text>
      </TouchableOpacity>
    )
  }

  renderFollowButton() {
    return (
      <TouchableOpacity style={[styles.followBtn, this.props.style]} onPress={this.handleFollowPress}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return this.props.user.isFollowing ? this.renderUnfollowButton() : this.renderFollowButton();
  }
}

export default FollowView