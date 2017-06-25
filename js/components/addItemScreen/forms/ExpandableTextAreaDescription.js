'use strict';

import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, TextInput,View } from 'react-native';
import styles from './styles';

class ExpandableTextAreaDescription extends PureComponent {

  static propTypes = {
    text: React.PropTypes.string,
    handleTextInput: React.PropTypes.func,
    onEndEditing: React.PropTypes.func,
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
                   placeholder={"Describe what you're wearing..."}
                   placeholderTextColor="#BDBDBD"
                   onEndEditing={this.props.onEndEditing}
                   onChangeText={(text) => this.props.handleTextInput(text)}
                   onContentSizeChange={(event) => this.setState({height: event.nativeEvent.contentSize.height})}
                   editable={true} />
      </View>
    )
  }
}

export default ExpandableTextAreaDescription

