'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class ExpandableTextArea extends Component {

  static propTypes = {
    text: React.PropTypes.string,
    handleTextInput: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <View style={styles.editAboutMeContainer}>
        <TextInput style={[styles.editAboutMeInput, { height: this.state.height }]}
                   maxLength={180}
                   numberOfLines={5}
                   multiline={true}
                   value={this.props.text}
                   onChangeText={(text) => this.props.handleTextInput(text)}
                   onContentSizeChange={(event) => this.setState({height: event.nativeEvent.contentSize.height})}
                   editable={true} />
      </View>
    )
  }
}

export default ExpandableTextArea

