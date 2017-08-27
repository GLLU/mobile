import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, TextInput, Keyboard } from 'react-native';
import { noop } from 'lodash';
import BaseComponent from '../../common/base/BaseComponent';
import SolidButton from '../../common/buttons/SolidButton';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#f2f2f2',
    padding: 10,
    flex: 1,
  },
  textInput: {
    flex: 4,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 5,
    fontFamily: Fonts.contentFont,
  },
  sendButton: {
    backgroundColor: '#00D7B2',
    flex: 1,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default class CommentInput extends BaseComponent {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSendPress = this.onSendPress.bind(this);
    this.state = {
      value: this.props.value,
    };
  }

  static propTypes = {
    style: React.PropTypes.any,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSendPress: React.PropTypes.func,
  };

  static defaultProps = {
    style: {},
    value: '',
    onChange: noop,
    onSendPress: noop,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState({ value });
  }

  onSendPress() {
    const commentValue = this.state.value;
    if (commentValue) {
      this.logEvent('LookScreen', { name: 'new comment added!', content: commentValue });
      this.props.onSendPress(this.state.value);
      Keyboard.dismiss();
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Comment"
          onChangeText={this.onChange}
          value={this.state.value}
          multiline
          blurOnSubmit={false}
        underlineColorAndroid="transparent" />
        <SolidButton
          label="SEND" disabled={_.isEmpty(this.state.value)}
          style={styles.sendButton}
          onPress={this.onSendPress} />
      </View>
    );
  }
}

