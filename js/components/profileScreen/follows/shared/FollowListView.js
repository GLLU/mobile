'use strict';

import React, { Component } from 'react';
import { Dimensions, ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { followUpdate, unFollowUpdate } from '../../../../actions';
import ListViewHeader from './ListViewHeader';
import FollowRow from './FollowRow';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6'
  },
});

class FollowListView extends Component {

  static propTypes = {
    follows: React.PropTypes.array,
    onEndReached: React.PropTypes.func,
    headerData: React.PropTypes.object,
    renderEmpty: React.PropTypes.func
  };

  static defaultProps = {
    renderEmpty: _.noop
  };

  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
    this.onUserNavigate = this.onUserNavigate.bind(this);
    this.toggleFollowAction = this.toggleFollowAction.bind(this);
    this.state = {
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.follows)) {
      this.setState({isTrueEndReached: true});
    }
  }

  onUserNavigate(props) {
    this.props.navigateTo('profileScreen', props);
  }

  toggleFollowAction(user, shouldFollow) {
    let data = {id: user.id};
    if (shouldFollow) {
      this.props.followUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
  }

  renderListView() {
    return (
    <FlatList
      style={styles.container}
      data={this.props.follows}
      keyExtractor={(follow,index)=>follow.id!==-1?follow.id:index}
      renderItem={({item}) => <FollowRow onUserPress={this.onUserNavigate} onFollowPress={this.toggleFollowAction} {...item}/>}
      onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
      onEndReachedThreshold={100}
    />
    );
  }

  render() {
    const count = this.props.headerData.count ? this.props.headerData.count : 0;
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <ListViewHeader goBack={this.props.goBack} count={count} title={`My ${this.props.headerData.mode}`}/>
        {this.props.headerData.count > 0 ? this.renderListView() : this.props.renderEmpty()}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(FollowListView);

