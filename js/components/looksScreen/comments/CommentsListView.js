import React, { Component } from 'react';
import { Animated, ListView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import CommentRow from './CommentRow'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    comments: React.PropTypes.array,
    count: React.PropTypes.number
  };

  static defaultProps = {
    style: {},
    comments: [],
    count: 0
  };

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.comments)) {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)});
    }
  }

  _renderListView() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <CommentRow {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        enableEmptySections={true}
      />
    );
  }

  _renderEmptyView() {
    return (
      <Text>
        Be the first to comment on this look :D
      </Text>
    );
  }

  render() {
    return this.props.count > 0 ? this._renderListView() : this._renderEmptyView()
  }
}