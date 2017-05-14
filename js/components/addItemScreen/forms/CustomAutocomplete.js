import React, { PropTypes } from 'react';
import { Icon } from 'native-base';
import {
  ListView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  textInput: {
    width: w - 40,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  itemText: {
    fontSize: new FontSizeCalculator(15).getSize(),
    margin: 2
  },
  listStyle: {
    height: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#FAFAFA'
  },
  resultItem: {
    height: 40,
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    padding: 10,
    backgroundColor: 'transparent'
  },
  autocompleteResults: {
  },
  btnCreateNew: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  btnCreateNewText: {
    flex: 1,
    color: '#1DE9B6',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
  },
  btnContainer: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputSelected: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
    fontWeight: 'bold'
  },
  iconCheckCompleteContainer: {
    position: 'absolute',
    right: -5,
    top: 5,
    width: 50,
    backgroundColor: 'transparent'
  },
  iconCheckComplete: {
    color: '#1DE9B6'
  },
  cancelButton: {
    alignSelf: 'flex-end',
  }
});

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
    onCancel: PropTypes.func,
    selected: PropTypes.bool,
    query: PropTypes.string
  };

  componentDidMount() {
    this.textInput.focus();

  }

  _renderTextInput() {
    const { onEndEditing, renderTextInput, style } = this.props;
    const props = {
      style: [styles.input, style],
       placeholderTextColor: '#E0E0E0',
      ref: ref => (this.textInput = ref),
      onEndEditing: e => (onEndEditing && onEndEditing(e)),
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
              <ScrollView
                  style={styles.listStyle}
                  keyboardShouldPersistTaps='always'
                  keyboardDismissMode='on-drag'
              >
                {this._drawResultItems()}
              </ScrollView>
              <View style={styles.btnContainer} >
                <Button transparent onPress={() => this.props.findOrCreateBrand(this.props.query, true)} style={StyleSheet.flatten(styles.btnCreateNew)} >
                  <Text style={styles.btnCreateNewText}>Add a New Brand "{this.props.query}"</Text>
                </Button>
              </View>
            </View>);
  }

  _renderButtonCreateNewItem() {
    return (<View style={styles.autocompleteResults}>
              <View style={[styles.btnContainer, {borderTopWidth: 1}]} >
                <Button transparent onPress={() => this.props.findOrCreateBrand(this.props.query, true)} style={StyleSheet.flatten(styles.btnCreateNew)} >
                  <Text style={styles.btnCreateNewText}>Add a New Brand "{this.props.query}"</Text>
                </Button>
              </View>
            </View>);
  }

  _renderCompleteTyping() {
    return (<View style={styles.iconCheckCompleteContainer}>
              <Icon name="md-checkmark-circle" style={StyleSheet.flatten(styles.iconCheckComplete)} />
            </View>)
  }

  handleCancel() {
    this.props.onCancel();
  }

  _renderCancelButton() {
    return (
      <TouchableOpacity
        onPress={this.handleCancel.bind(this)}
        style={styles.cancelButton}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { containerStyle, inputContainerStyle, query, selected } = this.props;
    const { dataSource } = this.state;
    const brands = dataSource._dataBlob.s1;
    let l = Object.keys(brands).length;
    let show = query !== '' && l > 0 && !selected;
    let showCreate = show === false && query !== '' && !selected;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          <View style={{flexGrow: 1}}>
            {this._renderTextInput()}
            {this.props.selected && this._renderCompleteTyping()}
          </View>
          <View style={{width: 50, justifyContent: 'flex-end'}}>
            {this._renderCancelButton()}
          </View>
        </View>
        {show && this._renderItems()}
        {showCreate && this._renderButtonCreateNewItem()}
      </View>
    );
  }

}

export default CustomAutocomplete;
