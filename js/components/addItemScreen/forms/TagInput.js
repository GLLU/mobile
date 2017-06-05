import React, { Component } from 'react';
import { StyleSheet, TextInput,View } from 'react-native'
import Tags from './Tags';
import _ from 'lodash';
import BaseComponent from "../../common/base/BaseComponent";

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
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    borderRightWidth: 1,
    borderColor: 'lightgrey'
  },
});

class TagInput extends BaseComponent {
  static propTypes = {
    tags: React.PropTypes.array,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
  }

  addTag(name) {
    this.logEvent('UploadLookScreen', { name: 'new tag manually added!', tagName: name });
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
      <View style={{flex: 1}}>
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
