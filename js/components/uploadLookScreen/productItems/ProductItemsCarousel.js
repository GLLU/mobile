// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');

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
    const shownOffers = (offers && offers.length > 9) ? offers.slice(0, 9) : offers;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.productItem}
          horizontal>
          {_.map(shownOffers, (item, index) => (
            <ProductItem key={index} offer={item} onSelectProductItem={() => onSelectProductItem(index)} />
          ))}
          <TouchableOpacity style={styles.moreContent} onPress={onMoreContentPress}>
            <Text style={styles.moreContentText}> More Items</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
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
  moreContentText: {
    textAlign: 'center',

  },
});

export default ProductItemsCarousel;
