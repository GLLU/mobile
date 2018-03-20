// @flow

import React, { Component } from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';

type Props = {
    imageUrl: string,
    brand: string,
}

class ProductItem extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      isSelected: false,
    };
  }

  handleAdd() {
    this.setState({ isSelected: !this.state.isSelected });
  }

  render() {
    const { imageUrl, brand } = this.props;
    const { isSelected } = this.state;

    return (
      <TouchableHighlight style={styles.container} onPress={this.handleAdd}>
        <View style={isSelected ? styles.imageSelected : styles.imageNotSelected}>
          <Image source={{ uri: imageUrl }} style={styles.imageUrl} resizeMode="contain" />
          <Text style={styles.brand}> {brand} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  imageUrl: {
    width: generateAdjustedSize(120),
    height: generateAdjustedSize(120),
  },
  imageSelected: {
    backgroundColor: 'white',
    borderColor: Colors.secondaryColor,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  imageNotSelected: {
    backgroundColor: 'white',
  },
  brand: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: 'rgba(0,0,0,1)',
    padding: 8,
    borderRadius: 2,
    position: 'absolute',
    fontSize: 14,
    bottom: 10,
    left: 0,
  },
});

export default ProductItem;
