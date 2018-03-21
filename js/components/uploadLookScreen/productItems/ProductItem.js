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
    this.handleSelectProductItem = this.handleSelectProductItem.bind(this);
    this.state = {
      isSelected: false,
      bigRatio: false,
    };
  }

  handleSelectProductItem() {
    const { onSelectProductItem } = this.props;
    onSelectProductItem();
  }

  componentWillMount() {
    const { offer } = this.props;
    const self = this;
    Image.getSize(offer.imageUrl, (width, height) => {
      self.setState({ bigRatio: (height / width > 3 || width / height > 3) });
    }, (error) => {});
  }

  render() {
    const { offer, onSelectProductItem } = this.props;
    const { bigRatio } = this.state;

    return (
      <TouchableHighlight style={styles.container} onPress={this.handleSelectProductItem}>
        <View style={offer.selected ? styles.imageSelected : styles.imageNotSelected}>
          <Image source={{ uri: offer.imageUrl }} style={styles.imageUrl} resizeMode={bigRatio ? 'contain' : 'cover'} />
          <Text style={styles.brand}> {offer.brand} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginLeft: 1,
  },
  imageUrl: {
    width: generateAdjustedSize(126),
    height: generateAdjustedSize(126),
  },
  imageSelected: {
    backgroundColor: 'white',
    borderColor: Colors.secondaryColor,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  imageNotSelected: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
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
