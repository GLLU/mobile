import React, {PureComponent} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity, Image} from 'react-native';
import i18n from 'react-native-i18n';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
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
    const formattedUrl = props.itemUrl.replace('http://', '');
    this.state = {
      url: formattedUrl
    }
  }

  updateUrlSelectValue(value) {
    this.setState({
      url: value
    });
    this.props.addUrl(value);
  }

  _clearUrl = () => {
    this.setState({
      url: ''
    });
  }

  render() {

    const {url} = this.state
    return (
      <View style={styles.brandInputContainer}>
        <Text style={styles.explanationText}>Enter the web-link to your item to help people find it:</Text>
        <View style={styles.urlRowContainer}>
          <Text style={styles.httpText}>http://www.</Text>
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
        </View>
        <Text style={styles.skipText}>{i18n.t('SKIP_LINK')}</Text>
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
    fontFamily: Fonts.regularFont,
  },
  skipText: {
    fontSize: generateAdjustedSize(13),
    fontFamily: Fonts.contentFont,
    color: Colors.lightGray,
    textAlign: 'center',
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
