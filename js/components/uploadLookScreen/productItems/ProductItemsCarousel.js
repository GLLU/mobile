// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import i18n from 'react-native-i18n';
import _ from 'lodash';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');
const MAX_SHOWN_OFFERS = 10;

class ProductItemsCarousel extends Component {

  render() {
    const { offers, onChangeToManualPress, onSelectProductItem, onEnlargeItem } = this.props;
    const shownOffers = (offers && offers.length > MAX_SHOWN_OFFERS) ? offers.slice(0, MAX_SHOWN_OFFERS - 1) : offers;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.productItem}
          horizontal>
          {_.map(shownOffers, (item, index) => (
            <ProductItem
              key={index}
              offer={item}
              onSelectProductItem={() => onSelectProductItem(index)}
              onEnlargeItem={onEnlargeItem} />
          ))}
          {offers.length > MAX_SHOWN_OFFERS ?
            <TouchableOpacity style={styles.moreContent} onPress={onChangeToManualPress}>
              <View style={styles.moreContentImageOverlay}>
                <Text style={styles.moreContentText}> {i18n.t('MORE_PRODUCT_ITEMS')}</Text>
              </View>
            </TouchableOpacity> : null }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundDark,
    height: generateAdjustedSize(135),
    bottom: 0,
    width,
  },
  carousel: {
    height: generateAdjustedSize(135),
    marginTop: 2,
    flexWrap: 'wrap',
    overflow: 'scroll',
    flexDirection: 'row',
    width,
    zIndex: 2,
  },
  productItem: {
    justifyContent: 'space-around',
  },
  moreContent: {
    width: generateAdjustedSize(126),
    height: generateAdjustedSize(126),
    marginLeft: 2,
    marginTop: 3,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  moreContentImage: {
    width: generateAdjustedSize(123),
    height: generateAdjustedSize(123),
  },
  moreContentImageOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreContentText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
    width: '100%',
    opacity: 1,
    color: Colors.secondaryColor,
  },
});

export default ProductItemsCarousel;
