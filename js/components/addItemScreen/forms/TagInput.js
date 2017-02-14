import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { View } from 'native-base';
import Tags from './Tags';
import { loadTags, addItemTag, removeItemTag } from '../../../actions';
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
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
});

class TagInput extends Component {
  static propTypes = {
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
    loadTags: React.PropTypes.func,
    itemTags: React.PropTypes.array,
  }

  addTag(name) {
    const itemTags = this.props.itemTags;
    const existing = _.find(itemTags, t => t.name.toLowerCase() == name.toLowerCase());
    if (!existing) {
      this.props.addItemTag(name).then(() => {
        this.textInput.clear();
      })
    }
  }

  removeTag(tag) {
    this.props.removeItemTag(tag.name);
  }

  render() {
    const { itemTags } = this.props;
    return (
      <View style={{flex: 1}}>
        <TextInput
          ref={ref => this.textInput = ref}
          returnKeyType="done"
          placeholder=""
          keyboardType="default"
          placeholderTextColor="#BDBDBD"
          style={styles.textInput}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onSubmitEditing={(event) => this.addTag(event.nativeEvent.text)}/>
        <Tags itemTags={itemTags} removeTag={this.removeTag.bind(this)} />
      </View>);
  }
}

function bindActions(dispatch) {
  return {
    loadTags: (term) => dispatch(loadTags(term)),
    addItemTag: (name) => dispatch(addItemTag(name)),
    removeItemTag: (name) => dispatch(removeItemTag(name)),
  }
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id == itemId);
  const itemTags = item ? item.itemTags : [];
  return ({
    itemTags,
  });
};

export default connect(mapStateToProps, bindActions)(TagInput);
