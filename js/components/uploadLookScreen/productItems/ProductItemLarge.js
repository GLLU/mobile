// @flow

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import i18n from 'react-native-i18n';
import SolidButton from '../../common/buttons/SolidButton';
import asScreen from '../../common/containers/Screen';
import Colors from '../../../styles/Colors.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';

const closeModalIcon = require('../../../../images/icons/cancel-clear-x.png');
const shareIcon = require('../../../../images/icons/share.png');
const favIcon = require('../../../../images/icons/rate_us.png');

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 40 : 18,
    marginLeft: 20,
  },
  imageUrl: {
    width: generateAdjustedSize(350),
    height: generateAdjustedSize(350),
    borderWidth: 1,
  },
  shopNowButton: {

  },
  itemTextContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  content: {
    marginTop: 50,
  },
  itemText: {
    fontSize: generateAdjustedSize(15),
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  closeModalImg: {
    width: 20,
    height: 20,
  },
});

class ProductItemLarge extends Component {

    constructor(props) {
      super(props);
      this._handleGoBack = this._handleGoBack.bind(this);
    }

    handleOpenLink() {

    }

    _handleGoBack() {
        this.props.goBack();
    }

    render() {
      const offer = this.props.navigation.state.params.offer;
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this._handleGoBack} style={styles.closeBtn}>
            <Image source={closeModalIcon} style={styles.closeModalImg} resizeMode={'contain'} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Image source={{ uri: offer.image_url }} style={styles.imageUrl} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}> {`${i18n.t('PRICE')}: ${offer.price}$`} </Text>
              <Text style={styles.itemText}> {`${i18n.t('BRAND')}: ${offer.brand_name}`} </Text>
              <Text style={styles.itemText}> {`${i18n.t('SOLD_AT')}: ${offer.merchant}`} </Text>
              <Text style={styles.itemText}> {i18n.t('SALE')} </Text>
            </View>
            <SolidButton
              label={i18n.t('SHOP_NOW')}
              style={styles.shopNowButton} onPress={() => this.handleOpenLink()} disabled={false} />
          </View>
        </View>
      );
    }
}

export default asScreen(ProductItemLarge);
