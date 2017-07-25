// @flow

import React, { Component } from 'react';
import * as _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native';
import I18n from 'react-native-i18n';

import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import SolidButton from '../common/buttons/SolidButton';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

const cardLogo = require('../../../images/logo/cardLogo.png');
const cardBG = require('../../../images/backgrounds/cardBG.png');

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
          <Image
            style={styles.card} source={cardBG} />
          <Image style={styles.logo} resizeMode={'contain'} source={cardLogo} />
          <View style={{ position: 'absolute', top: 53, left: 16 }}>
            <Text style={styles.balanceTitle}>{I18n.t('CURRENT_BALANCE')}</Text>
            <Text style={styles.balanceAmount}>{balance}<Text style={styles.dolarSign}>{I18n.t('USD')}</Text></Text>
            <Text style={styles.lastUpdate}>Last update: 06.06.17</Text>
          </View>
        </View>

        <Text style={[styles.lastUpdate, { alignSelf: 'center' }]}>13.30 USD pending confirmation</Text>

        <SolidButton label="Withdraw" style={styles.withdrawButton} onPress={this._handleWithdrawPressed} />

        {/*
         <Text style={styles.transactionDetails}>Transaction details</Text>
         */}

      </View>
    );
  }

  _handleWithdrawPressed = () => {
    const { balance, onWithdrawPressed } = this.props;

    onWithdrawPressed(balance);
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
    width: 50,
    height: 22.5,
    right: 16,
  },
  balanceTitle: {
    fontFamily: Fonts.regularFont,
    backgroundColor: 'transparent',
    color: Colors.white,
    fontSize: generateAdjustedSize(13),
  },
  balanceAmount: {
    fontFamily: Fonts.regularFont,
    backgroundColor: 'transparent',
    color: Colors.white,
    fontSize: generateAdjustedSize(40),
  },
  lastUpdate: {
    fontFamily: Fonts.regularFont,
    backgroundColor: 'transparent',
    fontSize: generateAdjustedSize(13),
    color: 'rgb(154, 154, 154)',
    marginTop: generateAdjustedSize(8),
  },
  withdrawButton: {
    width: generateAdjustedSize(265),
    height: generateAdjustedSize(45),
    backgroundColor: Colors.highlightColor,
    marginTop: generateAdjustedSize(25),
  },
  transactionDetails: {
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(16),
    color: 'rgb(104,104,104)',
    backgroundColor: 'transparent',
    marginTop: generateAdjustedSize(24.5),
  },
  dolarSign: {
    fontFamily: Fonts.regularFont,
    backgroundColor: 'transparent',
    fontSize: generateAdjustedSize(11.5),
    color: Colors.white,
  },
});

export default WalletScreen;