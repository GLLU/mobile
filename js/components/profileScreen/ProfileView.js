'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet,View} from 'react-native';
import { connect } from 'react-redux';
import { logout, navigateTo, followUpdate, unFollowUpdate } from '../../actions';
import FollowView from './follows/FollowView.js'
import BaseComponent from '../common/BaseComponent';

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
  name: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Times New Roman',
    marginTop: 5,
  },
  username: {
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
  },
  followView: {
    width:80
  }
});

class ProfileView extends BaseComponent {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    isFollowing: React.PropTypes.bool,
    userid: React.PropTypes.number,
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
    this.logEvent('ProfileScreen', { name: 'Edit click' });
    this.props.navigateTo('editProfileScreen', 'profileScreen', this.props.user);
  }

  toggleFollowAction(user, isFollowing) {
    let data = {id: user.id};
    if (isFollowing) {
      this.props.followUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
    this.props.onFollowPress(isFollowing);
  }

  render() {

    return (
      <View style={[styles.avatar, this.props.isMyProfile ? null : {left: 20}]}>
        <Image source={{uri: this.props.profilePic}} style={styles.avatarImg}/>
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.username}>@{this.props.username}</Text>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          {this.props.isMyProfile ?
            <TouchableOpacity style={styles.editBtn} onPress={this.handleEditPress.bind(this)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            :
            <FollowView user={{id:this.props.userid, isFollowing:this.props.isFollowing}}
                        onPress={this.toggleFollowAction.bind(this)} style={styles.followView}/>
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
  return {}
};

export default connect(mapStateToProps, bindAction)(ProfileView);

