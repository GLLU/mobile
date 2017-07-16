import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15
  }
});

const cancelIcon = require('../../../../images/icons/cancel-black.png');

type Props = {
  size: number,
  onPress: void,
  style: any
}

class CancelButton extends PureComponent {

  props: Props;

  render() {
    const {size = 30, onPress, style = styles.container} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={style}>
          <Image style={{height: size, width: size}} source={cancelIcon}/>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CancelButton;
