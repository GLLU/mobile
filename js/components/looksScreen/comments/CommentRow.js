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
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object])
  };

  static defaultProps = {
    style: {}
  };

  render() {
    return (
      <View>
        <Text>
          Hello World I'm Comments
        </Text>
      </View>
    );
  }
}










