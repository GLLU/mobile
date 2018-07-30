// @flow

import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback,View, Image, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import i18n from 'react-native-i18n';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../../styles/Colors.styles';
import fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import ProductItemLarge from './ProductItemLarge';
import Button from '../../common/buttons/Button';

const vInCircle = require('../../../../images/indicators/v_in_circle.png');
const shareInCircle = require('../../../../images/icons/shareInCircle.png');

class ProductItem extends Component {

  constructor(props) {
    super(props);
    this.handleSelectProductItem = this.handleSelectProductItem.bind(this);
    this.handleEnlargeProductItem = this.handleEnlargeProductItem.bind(this);
    this._handleEventNone = this._handleEventNone.bind(this);
    this.state = {
      isSelected: false,
      bigRatio: false,
    };
  }

  handleSelectProductItem() {
    const { onSelectProductItem, offer } = this.props;
    onSelectProductItem();
  }

  handleEnlargeProductItem() {
    const { onEnlargeItem, offer } = this.props;
    onEnlargeItem(offer);
  }

  _getFormattedPrice(price) {
    let formattedPrice = Math.round(price * 2) / 2;
    if (formattedPrice !== Math.round(formattedPrice)) {
      formattedPrice = formattedPrice.toFixed(2);
    }
    return price ? `${formattedPrice}$` : 'N/A';
  }

  _handleEventNone(event) {
    event.preventDefault();
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
    const { bigRatio, isEnlarged } = this.state;
    const isInSale = offer.price < offer.originalPrice;

    return (
      <TouchableWithoutFeedback onPress={event => this._handleEventNone(event)}>
        <View style={[styles.container, offer.selected ? styles.imageSelected : styles.imageNotSelected]}>
          <View style={styles.productLeft}>
            <TouchableHighlight onPress={this.handleEnlargeProductItem}>
              <View>
                <Image source={{ uri: offer.image_url }} style={styles.imageUrl} resizeMode={bigRatio ? 'contain' : 'cover'} />
                <Image source={shareInCircle} style={styles.shareInCircle} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.productRight}>
            <Text style={styles.brand}> {offer.brand_name}</Text>
            <Text style={[styles.price, isInSale ? styles.originalPrice : null]}> {`${offer.originalPrice}$`}</Text>
            {isInSale ? <Text style={styles.price}> {`SALE: ${offer.price}$`}</Text> : null}
            <View style={styles.buttonContainer}>
              <Button
                label={i18n.t('SHOP_NOW')}
                style={styles.shopNowButton} onPress={() => this.handleOpenLink()} />
              <Button
                label={i18n.t('WISH_LIST')}
                style={styles.wishListButton} onPress={() => this.handleAddToWishList()} />
            </View>
          </View>
          {offer.selected ?
            <TouchableOpacity style={styles.vInCircle} onPress={this.handleSelectProductItem}>
              <Image source={vInCircle} style={styles.vInCircleIcon} />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.choiceCircle} onPress={this.handleSelectProductItem}>
              <Text style={styles.choiceCircleInner} />
            </TouchableOpacity>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginLeft: 1,
    flexDirection: 'row',
    width: Platform.OS === 'ios' ? generateAdjustedSize(315) : generateAdjustedSize(265),
    height: Platform.OS === 'ios' ? generateAdjustedSize(184) : generateAdjustedSize(145),
  },
  productRight: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 8,
    height: Platform.OS === 'ios' ? generateAdjustedSize(156) : generateAdjustedSize(120),
  },
  imageUrl: {
    width: Platform.OS === 'ios' ? generateAdjustedSize(112) : generateAdjustedSize(100),
    height: Platform.OS === 'ios' ? generateAdjustedSize(150) : generateAdjustedSize(132),
  },
  productLeft: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft: 8,
    width: Platform.OS === 'ios' ? generateAdjustedSize(112) : generateAdjustedSize(100),
    height: Platform.OS === 'ios' ? generateAdjustedSize(150) : generateAdjustedSize(132),
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
    borderRadius: 2,
    left: 0,
    paddingBottom: 5,
    fontSize: Platform.OS === 'android' ? generateAdjustedSize(15) : generateAdjustedSize(16),
    fontFamily: fonts.contentFont,
  },
  originalPrice: {
    color: Colors.gray,
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
  price: {
    fontSize: Platform.OS === 'android' ? generateAdjustedSize(14) : generateAdjustedSize(15),
  },
  shareInCircle: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 30,
    height: 30,
  },
  shopNowButton: {
    backgroundColor: Colors.secondaryColor,
    marginBottom: 6,
    width: generateAdjustedSize(140),
    height: 30,
  },
  wishListButton: {
    backgroundColor: Colors.black,
    width: generateAdjustedSize(140),
    height: 30,
  },
  vInCircle: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: generateAdjustedSize(30),
    height: generateAdjustedSize(30),
  },
  vInCircleIcon: {
    position: 'absolute',
    width: generateAdjustedSize(30),
    height: generateAdjustedSize(30),
  },
  choiceCircle: {
    borderRadius: 20,
    position: 'absolute',
    right: 6,
    top: 6,
    width: generateAdjustedSize(26),
    height: generateAdjustedSize(26),
    borderWidth: 2,
    borderColor: Colors.gray,
  },
  choiceCircleInner: {
    backgroundColor: 'transparent',
  },
});

export default ProductItem;
