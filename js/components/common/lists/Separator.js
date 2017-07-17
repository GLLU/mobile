import React, { PureComponent } from 'react';
import { View,StyleSheet } from 'react-native';
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.separatorGray,
    height: 1
  }
});

class Separator extends PureComponent {

  render = () => <View style={[styles.separator, this.props.style]}/>
}

export default Separator;