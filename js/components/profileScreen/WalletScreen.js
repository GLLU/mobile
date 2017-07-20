// @flow

import React, { Component } from 'react';
import * as _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { generateAdjustedSize } from '../../utils/AdjustedFontSize';
import SolidButton from '../common/buttons/SolidButton';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

const deviceWidth = Dimensions.get('window').width;

class WalletScreen extends Component {

  props: {
    balance: number
  };

  static defaultProps = {
    onPress: _.noop,
    showLoader: false,
    loaderElement: null,
  }

  render(): React.Component {
    const { balance } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <LinearGradient
            style={styles.card} colors={['#000000', '#000000', '#000000']} />
          <Text style={styles.logo}>inFash</Text>
          <View style={{ position: 'absolute', top: 53, left: 16 }}>
            <Text style={styles.balanceTitle}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance}<Text style={styles.dolarSign}>USD</Text></Text>
            <Text style={styles.lastUpdate}>Last update: 06.06.17</Text>
          </View>
        </View>

        <Text style={[styles.lastUpdate, { alignSelf: 'center' }]}>13.30 USD pending confirmation</Text>

        <SolidButton label="Withdraw" style={styles.withdrawButton} />

        <Text style={styles.transactionDetails}>Transaction details</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: generateAdjustedSize(265),
    height: generateAdjustedSize(160),
    opacity: 0.8,
    borderRadius: generateAdjustedSize(22),
  },
  logo: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: 'white',
  },
  balanceTitle: {
    fontFamily: Fonts.regularFont,
    color: 'white',
    fontSize: generateAdjustedSize(13),
  },
  balanceAmount: {
    fontFamily: Fonts.regularFont,
    color: 'white',
    fontSize: generateAdjustedSize(40),
  },
  lastUpdate: {
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(13),
    color: 'rgb(154, 154, 154)',
    marginTop: generateAdjustedSize(8),
  },
  withdrawButton: {
    width: generateAdjustedSize(265),
    height: generateAdjustedSize(45),
    backgroundColor: '#ff3a7d',
    marginTop: generateAdjustedSize(25),
  },
  transactionDetails: {
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(16),
    color: 'rgb(104,104,104)',
    marginTop: generateAdjustedSize(24.5),
  },
  dolarSign: {
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(11.5),
    color: 'white',
  },
});

export default WalletScreen;
