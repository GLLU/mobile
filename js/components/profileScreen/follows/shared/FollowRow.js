import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


import FollowView from '../FollowView'

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
  followTitle: {
    flex: 0.5,
    flexDirection: 'row',
  },
  followName: {
    color: 'black',
  },
  followUsername: {
    color: '#00a9ff',
    marginLeft: 12
  },
  followAboutMe: {
    flex: 0.5,
    fontFamily: 'Times New Roman',
  },
  photoContainer: {
    flex: 2,
  },
  photo: {
    flex: 1,
    width: 50,
    height: 50,
    borderRadius: 25
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
        <View style={styles.followTitle}>
          <Text style={styles.followName}>{this.props.name}</Text>
          <Text style={styles.followUsername}>@{this.props.username}</Text>
        </View>
        <Text style={styles.followAboutMe}>{this.props.about_me}</Text>
      </View>
    )
  };

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
  };
}

export default FollowRow;