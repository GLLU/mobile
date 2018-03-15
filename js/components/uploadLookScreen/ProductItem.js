// @flow

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { generateAdjustedSize } from './../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';

type Props = {
    imageUrl: string,
    brand: string,
}

class ProductItem extends Component {
  props: Props;

  constructor(props) {
    super(props);
  }

  handleAdd() {

  }

  render() {
    const { imageUrl, brand } = this.props;

    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.imageUrl} />
        <Text style={styles.brand}> {brand} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  imageUrl: {
    width: generateAdjustedSize(130),
    height: generateAdjustedSize(130),
  },
  brand: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 8,
    borderRadius: 2,
    position: 'absolute',
    fontSize: 14,
    bottom: 5,
    left: 0,
  },
});

export default ProductItem;
