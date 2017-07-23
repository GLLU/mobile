// @flow

import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import { formatNumberAsString } from '../../utils/FormatUtils';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustedFontSize';

type Props = {
  number: string,
  title: string,
  style: any,
  onClick: () => void
};

class ProfileScreenStat extends Component {
  props: Props;

  render(): React.Element<any> {
    const { number, title, onClick, style } = this.props;

    return (

      <TouchableOpacity onPress={onClick} style={style}>
        <View style={{ alignItems: 'center' }}>
          {number >= 0 ? <Text style={styles.number}>{formatNumberAsString(number)}</Text> :
          <ActivityIndicator animating style={{ height: 50 }} color={Colors.secondaryColor} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  number: {
    fontSize: generateAdjustedSize(37),
    fontFamily: Fonts.regularFont,
    color: Colors.secondaryColor,
  },
  text: {
    color: Colors.white,
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.regularFont,
  },
});

export default ProfileScreenStat;
