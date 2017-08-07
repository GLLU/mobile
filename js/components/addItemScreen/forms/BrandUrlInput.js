import React, {PureComponent} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity, Image} from 'react-native'
import Colors from '../../../styles/Colors.styles'
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
const clear = require('../../../../images/icons/cancel-clear-x.png');


class BrandUrlInput extends PureComponent {

  static propTypes = {
    iconUrl: React.PropTypes.string,
    itemId: React.PropTypes.number,
    handleUrlEndEditing: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this._addUrl = this._addUrl.bind(this)
    const formattedUrl = props.itemUrl.replace('http://', '');
    this.state = {
      url: formattedUrl
    }
  }

  updateUrlSelectValue(value) {
    this.setState({
      url: value
    });
  }

  _clearUrl() {
    this.setState({
      url: ''
    });
  }

  _addUrl() {
    this.props.addUrl(this.state.url)
  }

  render() {

    const {url} = this.state
    return (
      <View style={styles.brandInputContainer}>
        <Text style={styles.explanationText}>Type the web-link to your item to help people find it:</Text>
        <View style={styles.urlRowContainer}>
          <Text style={styles.httpText}>Http://www.</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={ref => this.urlText = ref}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              keyboardType='url'
              style={styles.textInput}
              onChangeText={text => this.updateUrlSelectValue(text)}
              value={url}/>
          </View>
          <TouchableOpacity onPress={this._clearUrl}
                            style={styles.clearContainer}>
            <Image source={clear} style={styles.clearText}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._addUrl}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  brandInputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10
  },
  urlRowContainer: {
    flexDirection: 'row'
  },
  explanationText: {
    fontSize: generateAdjustedSize(13),
  },
  httpText: {
    fontSize: generateAdjustedSize(13),
    marginBottom: 2
  },
  textInputContainer: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    flex: 1
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 10,
    borderBottomColor: Colors.black,
    fontSize: generateAdjustedSize(13),
  },
  saveText: {
    color: Colors.secondaryColor,

    fontSize: generateAdjustedSize(13),
    fontWeight: '500'
  },
  clearContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  clearText: {
    height: 8,
    width: 8,
    alignSelf: 'center',
  },
});

export default BrandUrlInput;
