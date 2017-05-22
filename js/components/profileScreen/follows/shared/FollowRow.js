import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


import FollowView from '../FollowView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white'
  },
  textContainer: {
    flex: 7,
    flexDirection: 'column',
    marginLeft: 12
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
    this.renderFollowView = this.renderFollowView.bind(this);
    this.onFollowPress = this.onFollowPress.bind(this);
    this.state = {
      isFollowing: props.is_following
    }
  }

  onUserPress() {
    this.props.onUserPress(this.props);
  }

  onFollowPress(user, shouldFollow) {
    this.props.onFollowPress(...arguments);
    this.setState({isFollowing: shouldFollow})
  }

  renderFollowText() {
    return (
      <View onPress={this.onUserPress.bind(this)} style={styles.textContainer}>
        <Text style={styles.followName}>{this.props.name}</Text>
        <Text style={styles.followUsername}>@{this.props.username}</Text>
      </View>
    )
  }

  renderFollowView() {
    if (this.props.is_me) {
      return <View name="can't follow me" style={styles.followView}></View>;
    }
    return <FollowView onPress={this.onFollowPress} style={styles.followView}
                       user={{id:this.props.user_id, isFollowing:this.state.isFollowing}}/>
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container,this.props.style]}>
        <View style={styles.photoContainer}>
          <Image resizeMode='cover' source={{ uri: this.props.avatar.url}} style={styles.photo}/>
        </View>
        {this.renderFollowText()}
        {this.renderFollowView()}
      </TouchableOpacity>
    )
  }
}

export default FollowRow;