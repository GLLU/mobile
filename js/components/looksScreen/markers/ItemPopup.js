import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import I18n from 'react-native-i18n';
import { showInfo } from '../../../actions';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import SolidButton from '../../common/buttons/SolidButton';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';
import withAnalytics from '../../common/analytics/WithAnalytics';

const width = Dimensions.get('window').width;

//TODO: numbers to consts
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    marginHorizontal: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleItemContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    bottom: 100,
    width: generateAdjustedSize(210),
    height: generateAdjustedSize(120),
  },
  itemContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginLeft: 10,
    padding: 10,
    width: generateAdjustedSize(210),
    height: generateAdjustedSize(120),
  },
  carousel: {
    height: generateAdjustedSize(225),
    width,
    flexWrap: 'wrap',
    overflow: 'scroll',
    flexDirection: 'row',
  },
  productItem: {
    justifyContent: 'space-around',
  },
  brand: {
    fontSize: generateAdjustedSize(18),
    color: Colors.black,
    marginBottom: 4,
    fontFamily: Fonts.contentFont,
  },
  category: {
    fontSize: generateAdjustedSize(15),
    color: Colors.gray,
    marginBottom: 4,
    fontFamily: Fonts.contentFont,
  },
  itemImage: {
    width: generateAdjustedSize(75),
    height: generateAdjustedSize(100),
  },
  row: {
    padding: 5,
    textAlign: 'center',
  },
  titleColors: {
    color: 'black',
    backgroundColor: '#f4b85a',
  },
  buyColors: {
    color: '#f4b85a',
    backgroundColor: 'black',
  },
  topRoundCorners: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  bottomRoundCorners: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  shopNowButton: {
    backgroundColor: Colors.secondaryColor,
    width: 100,
    height: 30,
  },
});

class ItemPopup extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    brand: React.PropTypes.object,
    price: React.PropTypes.number,
    url: React.PropTypes.string,
    onLayout: React.PropTypes.func,
    dimensions: React.PropTypes.object,
    showInfo: React.PropTypes.func,
  };

  static defaultProps = {
    price: 0,
    brand: { name: 'N/A' },
    url: '',
    onLayout: noop,
  }

  handleOpenLink(index = 0) {
    const { url, lookId, itemId, is_verified, openWebView, offers } = this.props;
    const productUrl = offers ? offers[index].url : url;
    if (productUrl) {
      Linking.canOpenURL(productUrl).then((supported) => {
        if (!supported) {
        } else {
          this.props.logEvent('lookScreen', { name: 'click on item', isVerified: is_verified, lookId, itemId });
          offers ? openWebView(productUrl, lookId, itemId, offers[index].id) : openWebView(productUrl, lookId, itemId);
        }
      }).catch(err => console.error('An error occurred', err));
    } else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ");
    }
  }

  getTitle(brand, index = 0) {
    const { offers } = this.props;
    let title;
    if (offers && offers.length > 0) {
      title = offers[index].brand_name ? offers[index].brand_name : 'N/A';
    } else {
      title = brand ? brand.name : 'N/A';
    }
    return this._textEllipsis(title);
  }

  _textEllipsis(text) {
    return text.length > 15 ? `${text.substr(0, 10)}...` : text;
  }

  _renderSingleOffer() {
    const { category, brand, is_verified, offers, url } = this.props;
    return (
      <View style={styles.singleItemContainer}>
        <Image source={{ uri: offers ? offers[0].image_url : category.icon.url }} style={styles.itemImage} />
        <View style={styles.innerContainer}>
          <Text style={styles.brand}>{this.getTitle(brand)}</Text>
          { category ? <Text style={styles.category}>{(offers && offers.length === 1) ? category : category.name}</Text> : null }
          <SolidButton
            label={(is_verified || offers) ? I18n.t('SHOP_NOW') : I18n.t('VISIT_RETAILER')}
            style={styles.shopNowButton} onPress={() => this.handleOpenLink()} />
        </View>
      </View>
    );
  }

  _renderOffer(item, index) {
    const { category, brand, is_verified, offers } = this.props;
    return (
      <View style={styles.itemContainer} key={index}>
        <Image source={{ uri: item.image_url }} style={styles.itemImage} />
        <View style={styles.innerContainer}>
          <Text style={styles.brand}>{this.getTitle(brand, index)}</Text>
          { category ? <Text style={styles.category}>{category.name}</Text> : null }
          <SolidButton
            label={(is_verified || offers) ? I18n.t('SHOP_NOW') : I18n.t('VISIT_RETAILER')}
            style={styles.shopNowButton} onPress={() => this.handleOpenLink(index)} />
        </View>
      </View>
    );
  }

  render() {

    const { offers } = this.props;

    return (
      <View style={styles.container}>
        { offers && offers.length > 1 ?
          <ScrollView
            style={styles.carousel}
            contentContainerStyle={styles.productItem}
            horizontal>
            { _.map(offers, (item, index) => (
              this._renderOffer(item, index)))}
          </ScrollView> :
          this._renderSingleOffer() }
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, bindActions)(withAnalytics(ItemPopup));
