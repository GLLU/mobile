// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');
const MAX_SHOWN_OFFERS = 9;

class ProductItemsCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  render() {
    const { offers, onMoreContentPress, onSelectProductItem } = this.props;
    const { isOpen } = this.state;
    const shownOffers = (offers && offers.length > MAX_SHOWN_OFFERS) ? offers.slice(0, MAX_SHOWN_OFFERS - 1) : offers;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.productItem}
          horizontal>
          {_.map(shownOffers, (item, index) => (
            <ProductItem key={index} offer={item} onSelectProductItem={() => onSelectProductItem(index)} />
          ))}
          {offers.length > MAX_SHOWN_OFFERS ?
            <TouchableOpacity style={styles.moreContent} onPress={onMoreContentPress}>
              <Image style={styles.moreContentImage} source={{ uri: offers[shownOffers.length].image_url }} />
              <View style={styles.moreContentImageOverlay}>
                <Text style={styles.moreContentText}> More Items</Text>
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
    opacity: 0.5,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreContentText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
    opacity: 1,
    color: Colors.white,
  },
});

export default ProductItemsCarousel;
