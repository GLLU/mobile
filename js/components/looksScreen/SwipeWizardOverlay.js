// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity, View, Text, Dimensions, Easing, Animated } from 'react-native';
import i18n from 'react-native-i18n';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';

const { width, height } = Dimensions.get('window');
const swipeUp = require('../../../images/indicators/swipeUp.png');
const swipeDown = require('../../../images/indicators/swipeDown.png');

class SwipeWizardOverlay extends Component {

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  animate(easing) {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1500,
        easing,
      }
    ).start();
  }

  render() {
    const { onClose } = this.props;

    const marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 1],
    });
    const marginBottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 1],
    });

    this.animate(Easing.bounce);

    return (

      <TouchableOpacity style={{ flex: 1, position: 'absolute' }} onPress={onClose}>
        <View style={styles.container}>
          <View style={{ position: 'absolute', width, height, backgroundColor: '#343434', opacity: 0.8 }} />
          <Animated.View style={[{ marginTop }]}>
            <Image style={styles.icon} resizeMode={'contain'} source={swipeUp} />
          </Animated.View>
          <Text style={styles.title}>{i18n.t('SWIPE_WIZARD')}</Text>
          <Animated.View style={[{ marginBottom }]}>
            <Image style={styles.icon} resizeMode={'contain'} source={swipeDown} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: generateAdjustedSize(24),
    textAlign: 'center',
    color: Colors.white,
    marginHorizontal: 24,
    fontFamily: Fonts.boldContentFont,
  },
  container: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: generateAdjustedSize(90),
    marginTop: 18,
    marginBottom: 18,
    height: generateAdjustedSize(90),
  },
});

export default SwipeWizardOverlay;

