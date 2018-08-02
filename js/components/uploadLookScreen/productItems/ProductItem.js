// @flow

import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, Image, Text, StyleSheet, Platform, Linking } from 'react-native';
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import Colors from '../../../styles/Colors.styles';
import fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';
import { formatPrice, textEllipsis } from '../../../utils/FormatUtils';
import Button from '../../common/buttons/Button';
import { showInfo } from '../../../actions';
import asScreen from '../../common/containers/Screen';
import withAnalytics from '../../common/analytics/WithAnalytics';

const vInCircle = require('../../../../images/indicators/v_in_circle.png');
const shareInCircle = require('../../../../images/icons/shareInCircle.png');
const redPixel = require('../../../../images/icons/redPixel.png');

class ProductItem extends Component {

  constructor(props) {
    super(props);
    this.handleSelectProductItem = this.handleSelectProductItem.bind(this);
    this.handleEnlargeProductItem = this.handleEnlargeProductItem.bind(this);
    this._handleEventNone = this._handleEventNone.bind(this);
    this.handleOpenLink = this.handleOpenLink.bind(this);
    this.state = {
      isSelected: false,
      bigRatio: false,
      isShopNowClicked: false,
    };
  }

  handleSelectProductItem() {
    const { onSelectProductItem } = this.props;
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

  handleOpenLink(index = 0) {
    const { offer, showInfo, lookId, itemId, logEvent, navigateTo } = this.props;
    if (offer.url) {
      Linking.canOpenURL(offer.url).then((supported) => {
        if (!supported) {
          return;
        } else {
          logEvent('UploadLook', { name: 'click on shop now', lookId, itemId });
          this.setState({ isShopNowClicked: true });
          navigateTo('webViewScreen', { url: offer.url, headerData: { title: i18n.t('SHOP_ITEM') } });
        }
      }).catch(err => console.error('An error occurred', err));
    } else {
      showInfo("Sorry, we're still working on finding this item online for you. ");
    }
  }

  render() {
    const { offer, onSelectProductItem } = this.props;
    const { bigRatio, isEnlarged } = this.state;
    const isInSale = offer.price < offer.originalPrice;

    return (
      <TouchableWithoutFeedback onPress={event => this._handleEventNone(event)}>
        <View style={[styles.container, offer.selected ? styles.itemSelected : styles.itemNotSelected]}>
          <View style={styles.productLeft}>
            <TouchableHighlight onPress={this.handleEnlargeProductItem}>
              <View>
                <Image source={{ uri: offer.image_url }} style={styles.imageUrl} resizeMode={bigRatio ? 'contain' : 'cover'} />
                <Image source={shareInCircle} style={styles.shareInCircle} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.productRight}>
            <Text style={styles.brand}> {textEllipsis(offer.brand_name, 10, 8)}</Text>
            <Text style={[styles.price, isInSale ? styles.originalPrice : null]}> {`${formatPrice(offer.originalPrice)}`}</Text>
            {isInSale ? <Text style={styles.price}> {`${i18n.t('SALE')}: ${formatPrice(offer.price)}`}</Text> : null}
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
    marginLeft: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Platform.OS === 'ios' ? generateAdjustedSize(315) : generateAdjustedSize(265),
    height: Platform.OS === 'ios' ? generateAdjustedSize(174) : generateAdjustedSize(165),
  },
  productRight: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    height: Platform.OS === 'ios' ? generateAdjustedSize(156) : generateAdjustedSize(142),
  },
  imageUrl: {
    width: Platform.OS === 'ios' ? generateAdjustedSize(112) : generateAdjustedSize(106),
    height: Platform.OS === 'ios' ? generateAdjustedSize(150) : generateAdjustedSize(148),
  },
  productLeft: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingTop: 8,
    width: Platform.OS === 'ios' ? generateAdjustedSize(112) : generateAdjustedSize(106),
    height: Platform.OS === 'ios' ? generateAdjustedSize(150) : generateAdjustedSize(148),
  },
  itemSelected: {
    backgroundColor: Colors.white,
    borderColor: Colors.secondaryColor,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  itemNotSelected: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  brand: {
    borderRadius: 2,
    left: 0,
    paddingBottom: 5,
    fontSize: Platform.OS === 'android' ? generateAdjustedSize(15) : generateAdjustedSize(16),
    fontFamily: fonts.contentFont,
    color: Colors.black,
  },
  originalPrice: {
    color: Colors.gray,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: Platform.OS === 'android' ? generateAdjustedSize(14) : generateAdjustedSize(15),
    color: Colors.black,
  },
  shareInCircle: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  choiceCircleInner: {
    backgroundColor: 'transparent',
  },
});

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, bindActions)(withAnalytics(ProductItem));
