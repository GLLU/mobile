import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';
import FollowView from '../../profileScreen/follows/FollowView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 6,
    flexDirection: 'column',
    marginLeft: 12,
    alignSelf: 'flex-start'
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 12
  },
  markAsRead: {
    height: 10,
    width: 10,
    backgroundColor: '#00D780',
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  followName: {
    flex: 1,
    color: 'black',
  },
  followUsername: {
    flex: 1,
    color: '#00a9ff'
  },
  photoContainer: {
    flex: 2,
    width: 40,
    height: 40,
  },
  avatarImage: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  notificationImage: {
    flex: 1,
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5
  },
  followView: {
    flex: 2,

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
    userId: React.PropTypes.number,
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
    this.props.onUserPress(this.props);
    this.setState({isRead: true})
  }

  onNotificationPress() {
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

  renderNotificationImage() {
    return (
      <View onPress={this.onNotificationPress.bind(this)} style={styles.imageContainer}>
        {this.props.coverImage ? <Image resizeMode='cover' style={styles.notificationImage} source={{uri : this.props.coverImage.url}} /> : null}
      </View>
    )
  }

  renderMarkAsReadBtn(isRead) {
    if(isRead) {
      return (
        <View style={[styles.markAsRead, {backgroundColor: 'white'}]}  />
      )
    } else {
      return (
        <TouchableOpacity style={[styles.markAsRead]} onPress={this.onNotificationPress.bind(this)} />
      )
    }

  }

  renderFollowView() {
    return <View onPress={this.onFollowPress} style={styles.followView}
                       user={{id:this.props.userId, isFollowing: this.state.isFollowing}}/>
  }

  render() {
    const { isRead } = this.state;
    let bgColor = isRead ? 'white' : '#BDE6E9'
    return (
      <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container,this.props.style, {backgroundColor: bgColor}]}>
        <View style={styles.photoContainer}>
          <Image resizeMode='cover' source={{ uri: this.props.avatar.url}} style={styles.avatarImage}/>
        </View>
        { this.renderFollowText() }
        { this.props.action_kind !== 'Follow' ? this.renderNotificationImage() : this.renderFollowView() }
        { this.renderMarkAsReadBtn(isRead) }
      </TouchableOpacity>
    )
  }
}

export default FollowRow;