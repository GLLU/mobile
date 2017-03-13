import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2'
  }
});

export default class CommentRow extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    user_id: React.PropTypes.number,
    look_id: React.PropTypes.number,
    body: React.PropTypes.string,
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: React.PropTypes.number,
    children: React.PropTypes.array
  };

  static defaultProps = {
    style: {},
    id: -1,
    created_at: new Date().toUTCString(),
    body: '',
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: null,
    children: []
  };

  render() {
    return (
      <View>
        <Text>
          {this.props.body}
        </Text>
      </View>
    );
  }
}










