// @flow

import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
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

  render() {
    const { imageUrl, brand } = this.props;

    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.imageUrl} />
        <Text style={styles.brand}> {brand} </Text>
        <Button style={styles.addButton}> {i18n.t('SELECT_ITEM_LINK')} </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  imageUrl: {

  },
  brand: {

  },
  addButton: {
    background-color: #2CAF30;
    border: none;
    color: white;
    line-height: 25px;
    width: 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    font-weight:500;
    cursor: pointer;
  },
});

export default ProductItem;
