import React, { Component } from 'react';
import _ from 'lodash'
import { Animated, ListView, View, Text, TouchableHighlight, StyleSheet, FlatList } from 'react-native';
import CommentRow from './CommentRow'

const styles = StyleSheet.create({
  container: {
    maxHeight: 300
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e6e6e6',
  },
});

export default class CommentsListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrueEndReached: false
    };
  }

  static propTypes = {
    style: React.PropTypes.any,
    comments: React.PropTypes.array,
    isEmpty: React.PropTypes.bool,
    onUserPress: React.PropTypes.func
  };

  static defaultProps = {
    style: {},
    comments: [],
    isEmpty: true,
    onUserPress: _.noop

  };

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.comments)) {
      this.setState({isTrueEndReached: true});
    }
  }

  _renderListView() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.comments}
        keyExtractor={(comment,index)=>comment.id!==-1?comment.id:index}
        renderItem={({item}) => <CommentRow onUserPress={this.props.onUserPress} {...item}/>}
        onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  }

  _renderEmptyView() {
    return (
      <Text style={{textAlign:'center', padding:10}}>
        Be the first to comment on this look
      </Text>
    );
  }

  render() {
    return !this.props.isEmpty ? this._renderListView() : this._renderEmptyView()
  }
}