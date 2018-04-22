// @flow

import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import { noop } from 'lodash';

import CancelButton from '../buttons/CancelButton';
import Fonts from '../../../styles/Fonts.styles';
import Colors from '../../../styles/Colors.styles';

const infoIcon = require('../../../../images/icons/info.png');
const optionsIcon = require('../../../../images/icons/threedots.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: 50,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationSymbolContainer: {
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationSymbol: {
    height: null,
    width: null,
    resizeMode: 'contain',
    padding: 15,
  },
  title: {
    marginLeft: 10,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.regularFont,
  },
});

type Props = {
  title: string,
  iconSize: number,
  onCancelPress: void,
  iconType: string
}

class HalfScreenModalHeader extends PureComponent {

  props: Props;

  _getInfoIcon() {
    const { iconType } = this.props;
    switch (iconType) {
      case 'info':
        return infoIcon;
      case 'options':
        return optionsIcon;
      default:
        return infoIcon;
    }
  }

  renderInformationSymbol(size: number) {
    return (
      <View style={[{ width: size, height: size }, styles.informationSymbolContainer]}>
        <Image source={this._getInfoIcon()} style={styles.informationSymbol} />
      </View>
    )
  }

  render() {
    const { iconSize = 50, title, onCancelPress = noop } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.renderInformationSymbol(iconSize)}
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ padding: 5 }}>
            <CancelButton onPress={onCancelPress} />
          </View>
        </View>
      </View>
    );
  }

}

export default HalfScreenModalHeader;

