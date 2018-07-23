import React from 'react';
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  View,
  Image,
  Text,
} from 'react-native';
import {
  removeBrandName,
} from '../../actions';
import {
  addBrandName,
  createBrandName,
} from '../../actions/uploadLook';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BrandNameInput from './forms/BrandNameInput';
import FontSizeCalculator from './../../calculators/FontSize';

import BaseComponent from '../common/base/BaseComponent';

const styles = StyleSheet.create({
  titleLabelInfo: {
    fontFamily: Fonts.regularFont,
    color: Colors.white,
    fontSize: new FontSizeCalculator(15).getSize(),
    marginBottom: 8,
    paddingTop: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconCheckCompleteContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCheckComplete: {
    width: generateAdjustedSize(18),
    height: generateAdjustedSize(18),
    alignSelf: 'center',
  },
  searchIconContainer: {
    width: generateAdjustedSize(18),
    alignSelf: 'center',
  },
  searchText: {
    fontSize: generateAdjustedSize(12),
    fontFamily: Fonts.contentFont,
  },
});

class BrandSelector extends BaseComponent {
  static propTypes = {
    brand: React.PropTypes.object,
    brands: React.PropTypes.array,
    createBrandName: React.PropTypes.func,
    addBrandName: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      brandName: props.brand ? props.brand.name : null,
      fadeAnimContentOnPress: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    const selectedCategory = item ? item.category : null;
    if (selectedCategory && !item.brand && this.state.fadeAnimContentOnPress._value === 0) {
      this.toggleBottomContainer();
    }
    if (this.state.brandName && this.state.fadeAnimContentOnPress._value === 100) {
      this.toggleBottomContainer();
    }
    if (item.id !== this.props.item.id) {
      this.setState({
        brandName: item.brand ? item.brand.name : null,
      });

    }

  }

  findOrCreateBrand(brand) {
    const { handleTabsIndexChange } = this.props;
    const data = { ...brand, itemId: this.props.item.id };
    const brandName = brand.name;
    const brandFunction = brand.id ? this.props.addBrandName : this.props.createBrandName;
    if (brand.id) {
      brandFunction(brand.id, this.props.item.id);
    } else {
      brandFunction(data).then(() => {
        handleTabsIndexChange();
      }).catch(err => {
      });
    }

    this.setState({ modalVisible: false, brandName });
    if (brand.id) {
      this.logEvent('UploadLookScreen', { name: 'Brand pick', brand: brandName });
    } else {
      this.logEvent('UploadLookScreen', { name: 'Create new brand click', brand: brandName });
    }
  }

  handleClearBrandName() {
    this.logEvent('UploadLookScreen', { name: 'Brand cleared' });
    this.setState({ brandName: null }, () => {
      this.props.removeBrandName(this.props.item.id);
    });
  }

  handleTextFocus() {
    this.logEvent('UploadLookScreen', { name: 'Choose brand click' });
    this.setState({
      modalVisible: true,
    });
  }

  handleBrandCancel() {
    this.logEvent('UploadLookScreen', { name: 'Choose brand cancel' });
    this.setState({
      modalVisible: false,
    });
  }

  toggleBottomContainer() {
    if (this.state.fadeAnimContentOnPress._value === 100) {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 0,
          delay: 250,
        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 100,
          delay: 250,
        }            // Configuration
      ).start();
    }
  }

  _renderSearchIcon() {
      return (
        <TouchableOpacity
          onPress={this.handleTextFocus.bind(this)} style={styles.iconCheckCompleteContainer}>
          <View>
            <Image source={require('../../../images/icons/search-black.png')} style={styles.iconCheckComplete}/>
            <Text style={styles.searchText}>{i18n.t('SEARCH')}</Text>
          </View>
        </TouchableOpacity>
      );
  }

  renderOpenButton({ brand }) {
    const btnColor = !brand ? 'rgba(32, 32, 32, 0.4)' : 'rgba(0, 255, 128, 0.6)';
    return (
      <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
        <View style={{ backgroundColor: btnColor, width: 50, height: 30, alignSelf: 'center' }}>
          <FontAwesome style={{ fontSize: 16, marginTop: 2, textAlign: 'center' }} name="bars" />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { brands, item, items } = this.props;
    const { modalVisible } = this.state;
    const currItem = _.find(items, listItem => listItem.id === item.id);
    const brandName = currItem.brand ? currItem.brand.name : null;
    return (
      <View style={{ justifyContent: 'center' }}>
        {this._renderSearchIcon(currItem)}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <BrandNameInput
            style={{ marginTop: 10 }}
            brand={brandName}
            brands={brands}
            onCancel={this.handleBrandCancel.bind(this)}
            findOrCreateBrand={this.findOrCreateBrand.bind(this)} />
        </Modal>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    createBrandName: (data) => dispatch(createBrandName(data)),
    addBrandName: (brandId, itemId) => dispatch(addBrandName(brandId, itemId)),
    removeBrandName: (itemId) => dispatch(removeBrandName(itemId)),
  };
}

const mapStateToProps = state => {
  const { items } = state.uploadLook;

  return {
    items,
  };
};

export default connect(mapStateToProps, bindActions)(BrandSelector);
