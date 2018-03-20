// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');

class ProductItemsCarousel extends Component {

  render() {
    const { offers, onMoreContentPress } = this.props;
    const shownOffers = offers.slice(0, 9);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.productItem}
          horizontal>
          {_.map(shownOffers, (item, index) => (
            <ProductItem key={index} imageUrl={item.imageUrl} brand={item.brand} />
          ))}
          <TouchableOpacity style={styles.moreContent} onPress={onMoreContentPress}>
            <Text> More Items</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    height: generateAdjustedSize(140),
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    bottom: 0,
    width,
  },
  carousel: {
    height: generateAdjustedSize(140),
    flexWrap: 'wrap',
    overflow: 'scroll',
    flexDirection: 'row',
    width,
  },
  productItem: {
    justifyContent: 'space-around',
  },
  moreContent: {
    width: generateAdjustedSize(120),
    marginLeft: 10,
    padding: 5,
    backgroundColor: Colors.background,
  }
});

export default ProductItemsCarousel;
