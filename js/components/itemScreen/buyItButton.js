import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const buyItImage = require('../../../images/buyItButton.png');
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default class BuyItButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: React.PropTypes.string,
    price: React.PropTypes.number,
    btnText: React.PropTypes.string,
    currency: React.PropTypes.string,
    positionTop: React.PropTypes.number,
    positionLeft: React.PropTypes.number
  }

  static defaultProps = {
    price: 0,
    currency:'£',
    btnText: 'BUY'
  }

  _renderByCode() {
    <View style={{width: 80, top: (this.props.positionTop / 100 * h), left: (this.props.positionLeft / 100 * w)}}>
      <View style={{backgroundColor: '#fff',position: 'relative', height:30, justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Montserrat-Bold', color: '#000', alignSelf: 'center'}}>{this.props.title}</Text>
        <View></View>
      </View>
      <View style={{backgroundColor: '#f4b85a', height:30, justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Montserrat-Regular', color: '#fff', alignSelf: 'center'}}>{this.props.currency} {this.props.price}</Text>
      </View>
      <View style={{backgroundColor: '#000', height:30, justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Montserrat-Bold', color: '#f4b85a', alignSelf: 'center'}}>{this.props.btnText}</Text>
      </View>
    </View>
  }

  render() {
    return(
      <Image source={buyItImage} style={{width: 120, height: 140, resizeMode: 'contain',
        top: (this.props.positionTop / 100 * h), left: (this.props.positionLeft / 100 * w),
        paddingRight: 20, alignItems: 'center'}}>
        <Text style={{fontFamily: 'Montserrat-Bold', color: '#000', marginTop: 34}}>{this.props.title}</Text>
        <Text style={{fontFamily: 'Montserrat-Regular', color: '#fff',marginTop: 10}}>{this.props.currency} {this.props.price}</Text>
        <Text style={{fontFamily: 'Montserrat-Bold', color: '#f4b85a',marginTop: 8}}>{this.props.btnText}</Text>
      </Image>
    );
  }
}
