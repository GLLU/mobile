import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { noop } from 'lodash'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2'
  },
  commentsCountContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#00D7B2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInputContainer: {
    flex: 25,
    flexDirection:'column'
  },
  textInput: {
    flex: 2,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    padding: 2
  },
  sendButton: {
    backgroundColor: '#00D7B2',
    paddingLeft: 12,
    flex: 5,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sendButtonText: {
    color: 'white',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default class CommentInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSendPress = this.onSendPress.bind(this);
    this.state = {
      value: this.props.value
    }
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSendPress: React.PropTypes.func
  };

  static defaultProps = {
    style: {},
    value: '',
    onChange: noop,
    onSendPress: noop
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({value: nextProps.value})
    }
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState({value: value});
  }

  onSendPress() {
    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <View style={{flex:1}} name="spacer"/>
        <View style={styles.textInputContainer}>
          <View style={{flex:1}} name="spacer"/>
          <TextInput
            style={styles.textInput}
            placeholder="Add Comment"
            onChangeText={this.onChange}
            value={this.state.value}
            underlineColorAndroid='transparent'/>

        </View>
        <View style={{flex:1}} name="spacer"/>
        <TouchableOpacity style={styles.sendButton} onPress={this.onSendPress}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }
}










