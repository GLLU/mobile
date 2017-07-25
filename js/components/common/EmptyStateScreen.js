// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity, View, Text } from 'react-native';

import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import SolidButton from './buttons/SolidButton';

type emptyStateProps = {
  title: string,
  subtitle: string,
  icon: string,
  buttonText?: string,
  onButtonClicked: () => void
};

class EmptyStateScreen extends Component {

  props: emptyStateProps;

  render() {
    const { title, subtitle, icon, buttonText, onButtonClicked } = this.props;
    return (

      <View style={{ alignItems: 'center', marginTop: 16, marginLeft: 16, marginRight: 16 }}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.icon} resizeMode={'contain'} source={icon} />
        <Text style={styles.subtitle}>{subtitle}</Text>
        {buttonText ? <SolidButton label={buttonText} style={styles.actionButton} onPress={onButtonClicked} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: generateAdjustedSize(20),
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.regular,
  },
  subtitle: {
    fontSize: generateAdjustedSize(16),
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.contentFont,
    marginBottom: 18,
  },
  actionButton: {
    backgroundColor: Colors.highlightColor,
  },
  icon: {
    width: generateAdjustedSize(90),
    marginTop: 18,
    marginBottom: 18,
    height: generateAdjustedSize(90),
  },
});

export default EmptyStateScreen;

