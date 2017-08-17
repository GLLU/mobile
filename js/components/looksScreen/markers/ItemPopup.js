import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import I18n from 'react-native-i18n';

import { showInfo } from '../../../actions';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import SolidButton from '../../common/buttons/SolidButton';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import withAnalytics from '../../common/analytics/WithAnalytics';

export const POPUP_WIDTH = 160;
export const POPUP_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: POPUP_WIDTH,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  innerContainer: {
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignItems: 'center',
  },
  brand: {
    fontSize: generateAdjustedSize(16),
    color: Colors.black,
    marginBottom: 4,
    fontFamily: Fonts.contentFont,
  },
  category: {
    fontSize: generateAdjustedSize(14),
    color: Colors.white,
    marginBottom: 4,
    fontFamily: Fonts.contentFont,
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

  handleOpenLink() {
    const { url, look_id, id, is_verified } = this.props;
    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          this.props.logEvent('lookScreen', {name: 'click on item', isVerified: is_verified, lookId: look_id, item_id: id})
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    } else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ");
    }
  }

  getTitle(brand) {
    let title = brand ? brand.name : 'N/A';
    return title;
  }

  render() {

    const { category, brand, is_verified } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.brand}>{this.getTitle(brand)}</Text>
          { category ? <Text style={styles.category}>{category.name}</Text> : null }
          <SolidButton
            label={is_verified ? I18n.t('SHOP_NOW') : I18n.t('VISIT_RETAILER')}
            style={{ backgroundColor: Colors.black, width: 140, height: 30 }} onPress={this.handleOpenLink} />
        </View>
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
