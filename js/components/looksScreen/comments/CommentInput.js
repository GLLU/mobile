import React, {Component} from 'react';
import {Animated, View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, TextInput} from 'react-native';
import {noop} from 'lodash'
import BaseComponent from "../../common/base/BaseComponent";
import SolidButton from "../../common/buttons/SolidButton";

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2'
    },
    textInput: {
        flex: 25,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 12,
        textAlign: 'left',
        paddingLeft: 5,
    },
    sendButton: {
        backgroundColor: '#00D7B2',
        flex: 6,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
=======
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#f2f2f2',
    padding:10,
    flex: 1
  },
  textInput: {
    flex: 4,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 5
  },
  sendButton: {
    backgroundColor: '#00D7B2',
    flex: 1,
    marginLeft:10
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
>>>>>>> f41fd990ea77bc65f32d264db8068ec9a3733772
});

export default class CommentInput extends BaseComponent {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSendPress = this.onSendPress.bind(this);
        this.state = {
            value: this.props.value
        }
    }

    static propTypes = {
        style: React.PropTypes.any,
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
<<<<<<< HEAD

    onSendPress() {
        const commentValue = this.state.value
        if (commentValue) {
            this.logEvent('LookScreen', {name: `new comment added!`, content: commentValue});
            this.props.onSendPress(this.state.value);
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={{flex: 1}} name="spacer"/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Add Comment"
                    onChangeText={this.onChange}
                    value={this.state.value}
                    multiline={true}
                    underlineColorAndroid='transparent'/>
                <View style={{flex: 1}} name="spacer"/>
                <SolidButton label='SEND' style={styles.sendButton} onPress={this.onSendPress}/>
                <View style={{flex: 1}} name="spacer"/>
            </View>
        );
    }
=======
  }

  onChange(value) {
    this.props.onChange(value);
    this.setState({value: value});
  }

  onSendPress() {
    const commentValue = this.state.value;
    if (commentValue) {
      this.logEvent('LookScreen', {name: `new comment added!`, content: commentValue});
      this.props.onSendPress(this.state.value);
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
          multiline={true}
          underlineColorAndroid='transparent'/>
        <SolidButton label='SEND' style={styles.sendButton} onPress={this.onSendPress}/>
      </View>
    )
  }
>>>>>>> f41fd990ea77bc65f32d264db8068ec9a3733772
}










