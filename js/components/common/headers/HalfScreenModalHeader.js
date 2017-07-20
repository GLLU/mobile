// @flow

import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import CancelButton from "../buttons/CancelButton";

import Fonts from '../../../styles/Fonts.styles'
import Colors from '../../../styles/Colors.styles'
import { noop } from "lodash";
const infoIcon = require('../../../../images/icons/info-i-white.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: 50
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  informationSymbolContainer: {
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationSymbol: {
    height: null,
    width: null,
    resizeMode: 'contain',
    padding: 15
  },
  title: {
    marginLeft: 10,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Fonts.boldFont
  },
});

type Props = {
  title: string,
  iconSize: number,
  onCancelPress: void
}

class HalfScreenModalHeader extends PureComponent {

  props: Props;

  renderInformationSymbol(size: number) {
    return (
      <View style={[{width: size, height: size}, styles.informationSymbolContainer]}>
        <Image source={infoIcon} style={styles.informationSymbol}/>
      </View>
    )
  }

  render() {
    const {iconSize = 50, title, onCancelPress = noop} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.renderInformationSymbol(iconSize)}
          <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{padding: 5}}>
            <CancelButton onPress={onCancelPress}/>
          </View>
        </View>
      </View>
    );
  }

}

export default HalfScreenModalHeader;

