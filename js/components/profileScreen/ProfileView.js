'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View, Button } from 'native-base';
import { connect } from 'react-redux';
import { logout, navigateTo, followUpdate, unFollowUpdate } from '../../actions';
import FollowView from './FollowView.js'

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  name:{
    color: 'white',
    fontSize: 35,
    fontFamily: 'Times New Roman',
    marginTop: 5,
  },
  username:{
    color: '#00ABED',
    fontSize: 20,
    fontFamily: 'Times New Roman',
  },
  followBtn: {
    backgroundColor: '#00D7B2',
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
  },
  followText: {
    textAlign: 'center',
    color: 'white'
  },
  unfollowBtn: {
      backgroundColor: 'transparent',
      width: 75,
      height: 25,
      justifyContent: 'center',
      margin: 5,
      borderWidth: 2,
      borderColor: '#00D7B2',
  },
  unfollowText: {
      textAlign: 'center',
      color: '#00D7B2'
  },
  editBtn: {
    backgroundColor: 'transparent',
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: '#00D7B2',
  },
  editText: {
    textAlign: 'center',
    color: '#00D7B2'
  },
  logoutBtn: {
    borderWidth: 2,
    borderColor: '#00D7B2',
    justifyContent: 'center',
    width: 75,
    height: 25,
    margin: 5,
  },
  logoutText: {
    textAlign: 'center',
    color: '#00D7B2',
  }
});

class ProfileView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    profilePic: React.PropTypes.string,
    name: React.PropTypes.string,
    username: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  handleLogoutPress(e) {
    this.props.logout();
  }

  handleEditPress(e) {
    this.props.navigateTo('editProfileScreen', 'profileScreen', this.props.user);
  }

  handleEditPress(e) {
      this.props.navigateTo('editProfileScreen', 'profileScreen', this.props.user);
  }

  //TODO: logic is bugged until udi will deploy "isFollowed" feature
  toggleFollowAction(user,isFollowed) {
      if (isFollowed) {
          let data = {id: user.user_id, followers: user.followers+1, followed: true}
          this.props.followUpdate(data);
      } else {
          let data = {id: user.user_id, followers: user.followers-1, followed: false}
          this.props.unFollowUpdate(data);
      }
  }

  render() {
    return (
      <View style={[styles.avatar, this.props.isMyProfile ? null : {left: 20}]}>
        <Image source={{uri: this.props.profilePic}} style={styles.avatarImg} />
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.username}>@{this.props.username}</Text>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          {this.props.isMyProfile ?
            <TouchableOpacity style={styles.editBtn} onPress={this.handleEditPress.bind(this)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            :
            <FollowView user={this.props.user} onPress={this.toggleFollowAction.bind(this)}/>
          }
        </View>
      </View>
    )
  }
}


function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => {
  return {
    user: state.stats
  };
};

export default connect(mapStateToProps, bindAction)(ProfileView);

