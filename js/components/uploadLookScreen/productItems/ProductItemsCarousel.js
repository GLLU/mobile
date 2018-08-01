// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Platform, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import i18n from 'react-native-i18n';
import _ from 'lodash';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');
const MAX_SHOWN_OFFERS = 10;
const eyesIcon = require('../../../../images/icons/eyes.png');

class ProductItemsCarousel extends Component {

  render() {
    const { offers, onChangeToManualPress, onSelectProductItem, onEnlargeItem, lookId, itemId } = this.props;
    const shownOffers = (offers && offers.length > MAX_SHOWN_OFFERS) ? offers.slice(0, MAX_SHOWN_OFFERS - 1) : offers;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.productItem}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {_.map(shownOffers, (item, index) => (
            <ProductItem
              key={index}
              lookId={lookId}
              itemId={itemId}
              offer={item}
              onSelectProductItem={() => onSelectProductItem(index)}
              onEnlargeItem={onEnlargeItem} />
          ))}
          {offers.length > MAX_SHOWN_OFFERS ?
            <TouchableOpacity style={styles.moreContent} onPress={onChangeToManualPress}>
              <View style={styles.moreContentImageOverlay}>
                <Image source={eyesIcon} style={styles.didNotFind} />
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
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? generateAdjustedSize(186) : generateAdjustedSize(175),
    bottom: 0,
    width,
  },
  carousel: {
    height: Platform.OS === 'ios' ? generateAdjustedSize(186) : generateAdjustedSize(175),
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
    width: Platform.OS === 'ios' ? generateAdjustedSize(174) : generateAdjustedSize(155),
    height: Platform.OS === 'ios' ? generateAdjustedSize(174) : generateAdjustedSize(155),
    marginLeft: 7,
    marginTop: 1,
    marginRight: 7,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  didNotFind: {
    width: generateAdjustedSize(67),
    height: generateAdjustedSize(51),
  },
  moreContentImage: {
    width: generateAdjustedSize(112),
    height: generateAdjustedSize(112),
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
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  moreContentText: {
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? generateAdjustedSize(21) : generateAdjustedSize(18),
    paddingTop: 5,
    paddingHorizontal: 20,
    width: '100%',
    opacity: 1,
    color: Colors.black,
  },
});

export default ProductItemsCarousel;
