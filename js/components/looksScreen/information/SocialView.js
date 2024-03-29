// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { formatNumberAsString } from "../../../utils/FormatUtils";
import Fonts from "../../../styles/Fonts.styles";
import { noop } from "lodash";
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  icon: {
    height: 24,
    width: 24,
  },
  counter: {
    marginLeft: 10,
    fontFamily: Fonts.contentFont,
    fontSize: 20,
  },
  countLikeLabel: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.contentFont,
  },
});

type Props = {
  icon: any,
  onPress: void,
  count: string
}

class SocialView extends PureComponent {

  props: Props;

  render() {
    const {icon, count = 0, onPress = noop} = this.props;
    const formattedCount = formatNumberAsString(count);
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={icon} style={styles.icon}/>
        <Text style={styles.counter}>{formattedCount}</Text>
      </TouchableOpacity>
    )
  }
}

export default SocialView

