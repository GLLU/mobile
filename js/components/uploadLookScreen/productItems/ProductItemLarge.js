// @flow

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import i18n from 'react-native-i18n';
import Button from '../../common/buttons/Button';
import asScreen from '../../common/containers/Screen';
import Colors from '../../../styles/Colors.styles';
import { formatPrice } from '../../../utils/FormatUtils';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';

const h = Dimensions.get('window').height;
const closeModalIcon = require('../../../../images/icons/cancel-clear-x.png');
const shareInCircle = require('../../../../images/icons/shareInCircle.png');

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 40 : 18,
    paddingHorizontal: 20,
    height: h,
    backgroundColor: Colors.white,
  },
  imageView: {
    width: generateAdjustedSize(350),
    height: Platform.OS === 'ios' ? generateAdjustedSize(420) : generateAdjustedSize(340),
    borderWidth: 0.4,
    borderColor: Colors.lightGray,
  },
  imageUrl: {
    width: generateAdjustedSize(350),
    height: Platform.OS === 'ios' ? generateAdjustedSize(420) : generateAdjustedSize(340),
    resizeMode: 'cover',
  },
  shopNowButton: {
    marginTop: 6,
    marginBottom: 8,
    backgroundColor: Colors.secondaryColor,
  },
  wishListButton: {
    backgroundColor: Colors.black,
  },
  shareInCircle: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 45,
    height: 45,
  },
  itemTextContainer: {
    paddingTop: 6,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: generateAdjustedSize(350),
  },
  originalPrice: {
    color: Colors.gray,
    textDecorationLine: 'line-through',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 50,
  },
  itemText: {
    fontSize: generateAdjustedSize(18),
    fontWeight: '600',
    color: Colors.black,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
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
      const isInSale = offer.price < offer.originalPrice;
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this._handleGoBack} style={styles.closeBtn}>
            <Image source={closeModalIcon} style={styles.closeModalImg} resizeMode={'contain'} />
          </TouchableOpacity>
          <View style={styles.content}>  
            <View style={styles.imageView}>
              <Image source={{ uri: offer.image_url }} style={styles.imageUrl} />
              <Image source={shareInCircle} style={styles.shareInCircle} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}> {`${offer.brand_name}`} </Text>
              <View style={styles.priceContainer}>
                <Text style={[styles.itemText, isInSale ? styles.originalPrice : null]}> {formatPrice(offer.originalPrice)} </Text>
                {isInSale ? <Text style={styles.itemText}> {`${i18n.t('SALE')}: ${formatPrice(offer.price)}`} </Text> : null }
              </View>
            </View>
            <Button
              label={i18n.t('SHOP_NOW')}
              style={styles.shopNowButton} onPress={() => this.handleOpenLink()} />
            <Button
              label={i18n.t('WISH_LIST')}
              style={styles.wishListButton} onPress={() => this.handleAddToWishList()} />
          </View>
        </View>
      );
    }
}

export default asScreen(ProductItemLarge);
