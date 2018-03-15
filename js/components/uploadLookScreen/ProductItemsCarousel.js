// @flow

import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import { generateAdjustedSize } from './../../utils/AdjustabaleContent';
import Carousel from 'react-native-snap-carousel';
import ProductItem from './ProductItem';

const { width } = Dimensions.get('window');

class ProductItemsCarousel extends Component {

  _renderItem(offer) {
    return (
      <ProductItem key={offer.link} imageUrl={offer.imageUrl} brand={offer.brand} />
    );
  }

  render() {
    const { offers } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.carousel}
          horizontal
          data={offers}
          renderItem={({ item, index }) => {
            return (
              <ProductItem key={index} imageUrl={item.imageUrl} brand={item.brand} />
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: generateAdjustedSize(140),
    paddingTop: 5,
    paddingBottom: 5,
    width,
    position: 'absolute',
    bottom: 0,
  },
  carousel: {
    height: generateAdjustedSize(140),
    flex: 1,
    flexDirection: 'row',
  },
});

export default ProductItemsCarousel;

/*
return (
      <View style={styles.container}>
        <ScrollView style={styles.carousel} horizontal>
          {_.map(offers, offer => (
            <ProductItem key={offer.link} imageUrl={offer.imageUrl} brand={offer.brand} />
            ))}
        </ScrollView>
      </View>
    );
*/
