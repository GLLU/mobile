// @flow

import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.separatorGray,
    height: 1
  }
});

type Props = {
  style: any
}

class Separator extends PureComponent {

  props: Props;

  render = () => <View style={[styles.separator, this.props.style]}/>
}

export default Separator;