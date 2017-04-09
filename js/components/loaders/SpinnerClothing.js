/* @flow */

import React from 'react';
import { Image, Dimensions, Platform } from 'react-native';
import NativeBaseComponent from 'native-base/Components/Base/NativeBaseComponent';
import computeProps from 'native-base/Utils/computeProps';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height
const w = Dimensions.get('window').width;
export default class Spinner extends NativeBaseComponent {

  prepareRootProps() {
    const type = {
      height: 80,
    };

    const defaultProps = {
      style: type,
    };

    return computeProps(this.props, defaultProps);
  }


  render() {
    const getColor = () => {
      if (this.props.color) {
        return this.props.color;
      } else if (this.props.inverse) {
        return this.getTheme().inverseSpinnerColor;
      }

      return this.getTheme().defaultSpinnerColor;
    };

    return (
       <Image source={require('../images/gifs/fashion2.gif')} resizeMode={'contain'} style={{width: w,height: h, backgroundColor: 'rgba(32, 32, 32, 0.6)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} />
    );
  }

}
