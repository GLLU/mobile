import React, { Component } from 'react';
import { noop } from 'lodash'
import { Animated, ListView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
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
    const ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    this.state = {
      dataSource: ds.cloneWithRows(props.comments),
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
    onUserPress: noop

  };

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.comments)) {
      this.setState({isTrueEndReached: true});
    }
    if (nextProps.comments !== this.props.comments) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)
      })
    }
  }

  _renderListView() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <CommentRow onUserPress={this.props.onUserPress} {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        enableEmptySections={true}
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