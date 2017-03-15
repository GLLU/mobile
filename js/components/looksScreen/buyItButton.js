import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image, Dimensions } from 'react-native';

const buyItImage = require('../../../images/buyItButton.png');
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default class BuyItButton extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    title: React.PropTypes.string,
    price: React.PropTypes.number,
    btnText: React.PropTypes.string,
    currency: React.PropTypes.string,
    positionTop: React.PropTypes.number,
    positionLeft: React.PropTypes.number,
    url: React.PropTypes.string,
  }

  static defaultProps = {
    price: 0,
    title: 'N/A',
    currency: '£',
    btnText: 'BUY',
    url: ''
  }

  handleOpenLink() {
    const url = this.props.url;
    console.log(`item of brand ${this.props.title} that costs ${this.props.price} ${this.props.currency} clicked!`);
    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        }
        else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
  }

  render() {
    let title = this.props.title;
    title = title.length > 9 ? title.slice(0, 6) + '...' : title;
    return (
      <View
        style={{ flex: 1 , top: (this.props.positionTop / 100 * h), left: (this.props.positionLeft / 100 * w), position: 'absolute'}}>
        <Image source={buyItImage}
               style={{width: 120, height: 140, resizeMode: 'contain', paddingRight: 20, alignItems: 'center'}}>
          <Text
            style={{fontFamily: 'Montserrat-Bold', color: '#000', marginTop: 34, backgroundColor: 'transparent'}}>{title}</Text>
          <Text
            style={{fontFamily: 'Montserrat-Regular', color: '#fff',marginTop: 10, backgroundColor: 'transparent'}}>{this.props.currency} {this.props.price}</Text>
          <TouchableOpacity onPress={this.handleOpenLink}>
            <Text
              style={{fontFamily: 'Montserrat-Bold', color: '#f4b85a',marginTop: 8, backgroundColor: 'transparent'}}>{this.props.btnText}</Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}
