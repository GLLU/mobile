'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { navigateTo } from '../../actions';

import styles from './styles';

class StatsView extends Component {

  static propTypes = {
    following: React.PropTypes.number,
    followers: React.PropTypes.number,
    likes: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  handleFollowingPress(e) {
    this.props.navigateTo('followScreen', 'profileScreen', {user: this.props.user, mode:'following'});
  }

  handleFollowersPress(e) {
    this.props.navigateTo('followScreen', 'profileScreen', {user: this.props.user, mode:'followers'});
  }

  render() {
    return (
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statsTotal} onPress={this.handleFollowingPress.bind(this)}>
          <Text style={[styles.text, styles.number]}>{this.props.following}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statsTotal} onPress={this.handleFollowersPress.bind(this)}>
          <Text style={[styles.text, styles.number]}>{this.props.followers}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{this.props.likes}</Text>
          <Text style={styles.text}>Likes</Text>
        </View>
      </View>
    )
  }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional))
    };
}

const mapStateToProps = state => { return {} };

export default connect(mapStateToProps, bindAction)(StatsView);

