import React, { Component } from 'react';
import { StyleSheet, TextInput,View } from 'react-native'
import Tags from './Tags';
import _ from 'lodash';

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: 5
  },
  autocompleteContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
});

class TagInput extends Component {
  static propTypes = {
    tags: React.PropTypes.array,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
  }

  addTag(name) {
    const {tags, itemId} = this.props;
    const existing = _.find(tags, t => t.name.toLowerCase() == name.toLowerCase());
    if (!existing) {
      this.props.addItemTag(name, itemId).then(() => {
        this.textInput.clear();
      })
    }
  }

  removeTag(tag) {
    const { itemId } = this.props
    this.props.removeItemTag(tag.name, itemId);
  }

  render() {
    const { tags } = this.props;
    return (
      <View>
        <TextInput
          ref={ref => this.textInput = ref}
          returnKeyType="done"
          placeholder="(i.e Yellow, hipster, pants)"
          keyboardType="default"
          placeholderTextColor="#BDBDBD"
          style={styles.textInput}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onSubmitEditing={(event) => this.addTag(event.nativeEvent.text)}/>
        <Tags tags={tags} removeTag={this.removeTag.bind(this)} />
      </View>);
  }
}

export default TagInput;
