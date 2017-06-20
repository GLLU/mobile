import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native'

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
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRightWidth: 1,
    borderColor: 'lightgrey'
  },
});

class BrandUrlInput extends PureComponent {

  static propTypes = {
    iconUrl: React.PropTypes.string,
    itemId: React.PropTypes.number,
    handleUrlEndEditing: React.PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      url: props.itemUrl
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.shouldFocus !== this.props.shouldFocus){
      this.urlText.focus();
    }
  }

  updateUrlSelectValue(value) {
    this.setState({
      url: value
    });
  }

  render() {

    const { iconUrl, itemId } = this.props
    const { url } = this.state
    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          ref={ref => this.urlText = ref}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          keyboardType='url'
          style={styles.textInput}
          placeholder='http://www.infash.com'
          onChangeText={text => this.updateUrlSelectValue(text)}
          onEndEditing={(event) => this.props.handleUrlEndEditing(event, itemId)}
          value={url}/>
        <View style={{height: 50, padding: 2, backgroundColor: 'white', marginTop: 10, marginBottom: 10}}>
          <Image source={{uri: iconUrl}} style={[{height: 46, backgroundColor: 'white', borderLeftWidth: 2,width: 30,
            resizeMode: 'contain',
            alignSelf: 'center',}]} />
        </View>
      </View>
    );
  }
}

export default BrandUrlInput;
