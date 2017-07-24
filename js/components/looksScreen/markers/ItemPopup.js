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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  innerContainer: {
    backgroundColor: Colors.lightGray,
    marginHorizontal: 6,
    marginVertical: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  brand: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '900',
    marginBottom: 4,
    fontFamily: Fonts.contentFont,
  },
  category: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.contentFont,
    marginBottom: 4,
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
    const url = this.props.url;
    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    } else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ");
    }
  }

  getTitle(brand) {
    const titleLength = 12;
    let title = brand ? brand.name : 'N/A';
    title = title.length > titleLength ? `${title.slice(0, titleLength - 3)}...` : title;
    return title;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.brand}>{this.getTitle(this.props.brand)}</Text>
          <SolidButton
            label={this.props.is_verified ? I18n.t('SHOP_NOW') : I18n.t('VISIT_RETAILER')}
            style={{ backgroundColor: Colors.black, marginHorizontal: 8, width: 200 }} onPress={this.handleOpenLink} />
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

export default connect(mapStateToProps, bindActions)(ItemPopup);
