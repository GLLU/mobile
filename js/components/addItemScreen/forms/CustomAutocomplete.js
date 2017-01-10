import React, { PropTypes } from 'react';
import { Icon } from 'native-base';
import {
  ListView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';

import styles from './styles';

class CustomAutocomplete extends Autocomplete {

  static propTypes = {
    ...TextInput.propTypes,
    containerStyle: View.propTypes.style,
    data: PropTypes.array,
    inputContainerStyle: View.propTypes.style,
    listStyle: ListView.propTypes.style,
    onShowResults: PropTypes.func,
    renderTextInput: PropTypes.func,
    findOrCreateBrand: PropTypes.func,
    selected: PropTypes.bool,
    query: PropTypes.string
  };

  _renderTextInput() {
    const { onEndEditing, renderTextInput, style } = this.props;
    const props = {
      style: [styles.input, style],
       placeholderTextColor: '#E0E0E0',
      ref: ref => (this.textInput = ref),
      onEndEditing: e =>
        this._showResults(false) || (onEndEditing && onEndEditing(e)),
      ...this.props
    };

    return renderTextInput
      ? renderTextInput(props)
      : (<TextInput {...props} />);
  }

  _drawResultItems() {
    const { dataSource } = this.state;
    const brands = dataSource._dataBlob.s1;
    return brands.map((item, index) => {
      const borderBottomWidth = index == (Object.keys(brands).length - 1) ? 1: 0;
      return (<TouchableOpacity style={[styles.resultItem, {borderBottomWidth: borderBottomWidth}]} key={index} onPress={() => this.props.findOrCreateBrand(item, false)} >
                <Text>{item.name}</Text>
              </TouchableOpacity>);
    });
  }

  _renderItems() {
    return (<View style={styles.autocompleteResults}>
              <ScrollView style={styles.listStyle} keyboardShouldPersistTaps={true}>
                {this._drawResultItems()}
              </ScrollView>
              <View style={styles.btnContainer} >
                <Button transparent onPress={() => this.props.findOrCreateBrand(this.query, true)} style={styles.btnCreateNew} >
                  <Text style={styles.btnCreateNewText}>Create new...</Text>
                </Button>
              </View>
            </View>);
  }

  _renderButtonCreateNewItem() {
    return (<View style={styles.autocompleteResults}>
              <View style={[styles.btnContainer, {borderTopWidth: 1}]} >
                <Button transparent onPress={() => this.props.findOrCreateBrand(this.props.query, true)} style={styles.btnCreateNew} >
                  <Text style={styles.btnCreateNewText}>Create new...</Text>
                </Button>
              </View>
            </View>);
  }

  _renderCompleteTyping() {
    return (<View style={styles.iconCheckCompleteContainer}>
            <Icon name="md-checkmark-circle" style={styles.iconCheckComplete} />
            </View>)
  }

  render() {
    const { containerStyle, inputContainerStyle } = this.props;
    const { dataSource } = this.state;
    const brands = dataSource._dataBlob.s1;
    let l = Object.keys(brands).length;
    let show = l == 0 ? false : true;
    let showCreate = show === false && this.props.query !== '' && !this.props.selected;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this._renderTextInput()}
          {this.props.selected && this._renderCompleteTyping()}
        </View>
        {show && this._renderItems()}
        {showCreate && this._renderButtonCreateNewItem()}
      </View>
    );
  }

}

export default CustomAutocomplete;
