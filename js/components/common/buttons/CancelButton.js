import React, { PureComponent } from 'react';
import * as _ from 'lodash';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',


  }
});

const cancelIcon = require('../../../../images/icons/cancel-black.png');

class CancelButton extends PureComponent {

  static propTypes = {
    onPress: React.PropTypes.func,
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{backgroundColor:'white', borderRadius:15}}>
        <Image style={{height: 30, width: 30}} source={cancelIcon}/>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CancelButton;
