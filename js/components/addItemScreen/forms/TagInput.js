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
    tags: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      tmpValue: ''
    };
  }

  addTag(name) {
    const tags = this.props.tags;
    const existing = _.find(tags, t => t.name.toLowerCase() == name.toLowerCase());
    if (!existing) {
      this.props.addItemTag(name).then(() => {
        this.setState({tmpValue: ''});  
      })
    }
  }

  removeTag(tag) {
    this.props.removeItemTag(tag.name);
  }

  render() {
    const { tmpValue } = this.state;
    const { tags } = this.props;
    return (
      <View style={{flex: 1}}>
        <TextInput
          returnKeyType="done"
          placeholder=""
          value={tmpValue}
          keyboardType="default"
          placeholderTextColor="#BDBDBD"
          style={styles.textInput}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onSubmitEditing={(event) => this.addTag(event.nativeEvent.text)}
          onChangeText={(text) => this.setState({tmpValue: text})} />
        <Tags tags={tags} removeTag={this.removeTag.bind(this)} />
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
  return ({
  });
};

export default connect(mapStateToProps, bindActions)(TagInput);
