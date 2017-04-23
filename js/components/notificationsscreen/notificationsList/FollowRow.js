import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',

  },
  textContainer: {
    flex: 7,
    flexDirection: 'column',
    marginLeft: 12
  },
  markAsRead: {
    height: 10,
    width: 10,
    backgroundColor: '#00D7B2',
    borderRadius: 5,
    alignSelf: 'flex-start'

  },
  followName: {
    flex: 0.5,
    color: 'black',
  },
  followUsername: {
    flex: 0.5,
    color: '#00a9ff'
  },
  photoContainer: {
    flex: 2,
  },
  photo: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  followView: {
    flex: 3
  }
});

class FollowRow extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    username: React.PropTypes.string,
    aboutMe: React.PropTypes.string,
    avatar: React.PropTypes.object,
    onFollowPress: React.PropTypes.func,
    onUserPress: React.PropTypes.func,
    userid: React.PropTypes.number,
    isFollowing: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.renderFollowText = this.renderFollowText.bind(this);
    this.onFollowPress = this.onFollowPress.bind(this);
    this.state = {
      isRead: props.is_read
    }
  }

  onUserPress() {
    this.props.onMarkAsReadPress(this.props);
    this.setState({isRead: true})
  }

  onFollowPress(user, shouldFollow) {
    this.props.onFollowPress(...arguments);
    this.setState({isFollowing: shouldFollow})
  }

  renderFollowText() {
    let timeStamp = this.props.created_at
    return (
      <View onPress={this.onUserPress.bind(this)} style={styles.textContainer}>
        <Text style={styles.followName}>{this.props.name+' '+this.props.actionText}</Text>
        <TimeAgo style={styles.followUsername} time={timeStamp} />
      </View>
    )
  }

  renderMarkAsReadBtn() {
    return (
    <TouchableOpacity style={styles.markAsRead} onPress={this.onUserPress.bind(this)}>
      <View style={styles.markAsRead} />
    </TouchableOpacity>
    )
  }

  render() {
    let bgColor = this.state.isRead ? 'white' : '#BDE6E9'
    return (
      <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container,this.props.style, {backgroundColor: bgColor}]}>
        <View style={styles.photoContainer}>
          <Image resizeMode='cover' source={{ uri: this.props.avatar.url}} style={styles.photo}/>
        </View>
        {this.renderFollowText()}
        {this.renderMarkAsReadBtn()}
      </TouchableOpacity>
    )
  }
}

export default FollowRow;