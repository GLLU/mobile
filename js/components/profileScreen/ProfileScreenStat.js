// @flow

import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

type Props = {
  number: string,
  title: string,
  onClick: () => void
};

class ProfileScreenStat extends Component {
  props: Props;

  render(): React.Element<any> {
    const { number, title, onClick } = this.props;

    return (

      <TouchableOpacity onPress={onClick}>
        <View style={{ alignItems: 'center' }}>
          {number >= 0 ? <Text style={styles.number}>{String(number)}</Text> :
          <ActivityIndicator animating style={{ height: 50 }} color={Colors.highlightColor} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  number: {
    fontSize: 37,
    fontFamily: Fonts.regularFont,
    color: Colors.highlightColor,
  },
  text: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.regularFont,
  },
});

export default ProfileScreenStat;
