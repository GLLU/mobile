/* @flow */

import React,{Component} from 'react';
import { Image, Dimensions, Platform } from 'react-native';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height
const w = Dimensions.get('window').width;
export default class Spinner extends Component {

  render() {

    return (
       <Image source={require('../images/gifs/fashion2.gif')} resizeMode={'contain'} style={{width: w,height: h, backgroundColor: 'rgba(32, 32, 32, 0.6)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} />
    );
  }

}
