// @flow

import React, { Component } from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';

const vInCircle = require('../../../../images/indicators/v_in_circle.png');

class ProductItem extends Component {

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

  _getFormattedPrice(price) {
    let formattedPrice = Math.round(price * 2) / 2;
    if (formattedPrice !== Math.round(formattedPrice)) {
      formattedPrice = formattedPrice.toFixed(2);
    }
    return price ? `${formattedPrice}$` : 'N/A';
  }

  componentWillMount() {
    const { offer } = this.props;
    const self = this;
    Image.getSize(offer.image_url, (width, height) => {
      if (self._isMounted) {
        self.setState({ bigRatio: (height / width > 3 || width / height > 3) });
      }
    }, (error) => {});
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { offer, onSelectProductItem } = this.props;
    const { bigRatio } = this.state;

    return (
      <TouchableHighlight style={styles.container} onPress={this.handleSelectProductItem}>
        <View style={offer.selected ? styles.imageSelected : styles.imageNotSelected}>
          <Image source={{ uri: offer.image_url }} style={styles.imageUrl} resizeMode={bigRatio ? 'contain' : 'cover'} />
          <Text style={styles.brand}> {offer.brand_name} </Text>
          <Text style={styles.price}> {this._getFormattedPrice(offer.price)} </Text>
          {offer.selected ? <Image source={vInCircle} style={styles.vInCircle} /> : null }
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
    backgroundColor: Colors.white,
    borderColor: Colors.secondaryColor,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  imageNotSelected: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  brand: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 2,
    position: 'absolute',
    bottom: 10,
    left: 0,
    color: 'rgba(0,0,0,1)',
    fontSize: generateAdjustedSize(14),
    fontFamily: fonts.contentFont,
  },
  price: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    fontSize: generateAdjustedSize(13),
    position: 'absolute',
    left: 5,
    top: 5,
  },
  vInCircle: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 20,
    height: 20,
  },
});

export default ProductItem;
