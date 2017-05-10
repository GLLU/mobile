import React, { Component } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity, Dimensions, Platform, TouchableWithoutFeedback, Animated, UIManager, View, Text } from 'react-native';
import { Icon } from 'native-base';
import {
  addBrandName,
  createBrandName,
  removeBrandName,
} from '../../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
import BrandNameInput from './forms/BrandNameInput';
import FontSizeCalculator from './../../calculators/FontSize';
import glluTheme from '../../themes/gllu-theme';
import _ from 'lodash';
import Gllu from '../common';
import BaseComponent from '../common/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
const styles = StyleSheet.create({
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(15).getSize(),
    marginBottom: 8,
    paddingTop: 10,
    textAlign: 'center'
  },
  inputContainer: {
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
    paddingLeft: 3,

  },
  iconCheckCompleteContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconCheckComplete: {
    alignSelf: 'center',
  }
});


class StepZeroBrand extends BaseComponent {
  static propTypes = {
    brand: React.PropTypes.object,
    brands: React.PropTypes.array,
    createBrandName: React.PropTypes.func,
    addBrandName: React.PropTypes.func,
    onValid: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      brandName: props.brand ? props.brand.name : null,
      fadeAnimContentOnPress: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(props) {
    if(true) {
      if(this.props.selectedCategory && !props.brand && this.state.fadeAnimContentOnPress._value === 0) {
        this.toggleBottomContainer()
      }
      this.setState({
        brandName: props.brand ? props.brand.name : null,
      });

      if(this.state.brandName && this.state.fadeAnimContentOnPress._value === 100) {
        this.toggleBottomContainer()
      }
    } else {
      this.setState({
        brandName: props.brand ? props.brand.name : null,
      });
    }

  }

  findOrCreateBrand(value, createNew) {
    const brandName = typeof value === 'string' ? value : value.name;
    const f = createNew ? this.props.createBrandName : this.props.addBrandName;
    f(value).then(() => {
      console.log('brand added')

    }).catch(err => {
      console.log('error', err);
    })
    this.setState({modalVisible: false, brandName});

    if (createNew) {
      this.logEvent('UploadLookScreen', { name: 'Create new brand click', brand: brandName });
    } else {
      this.logEvent('UploadLookScreen', { name: 'Brand pick', brand: brandName });
    }
  }

  handleClearBrandName() {
    this.logEvent('UploadLookScreen', { name: 'Brand cleared' });
    this.setState({brandName: null}, () => {
      this.props.removeBrandName();
    });
  }

  handleTextFocus() {
    this.logEvent('UploadLookScreen', { name: 'Choose brand click' });
    this.setState({
      modalVisible: true
    });
  }

  handleBrandCancel() {
    this.logEvent('UploadLookScreen', { name: 'Choose brand cancel' });
    this.setState({
      modalVisible: false
    });
  }

  toggleBottomContainer() {
    if (this.state.fadeAnimContentOnPress._value === 100) {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 0,
          delay: 250
        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 100,
          delay: 250
        }            // Configuration
      ).start();
    }
  }

  renderClearIcon() {
    if (this.state.brandName) {
      return (
        <TouchableOpacity
          style={styles.iconCheckCompleteContainer}
          onPress={this.handleClearBrandName.bind(this)}
        >
          <Icon name="md-close-circle" style={StyleSheet.flatten(styles.iconCheckComplete)} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  renderOpenButton() {
    const btnColor = !this.props.brand ? 'rgba(32, 32, 32, 0.4)' : 'rgba(0, 255, 128, 0.6)'
    return (
      <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
        <View style={{ backgroundColor: btnColor, width: 50, height: 30, justifyContent: 'center', alignSelf: 'center'}}>
          <FontAwesome style={{ fontSize: 16, marginTop: 2, textAlign: 'center'}} name="bars"/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { brands, brand} = this.props;
    const { brandName, modalVisible } = this.state;
    const _brand = brandName ? brand : null;

    return (
      <View>
        <View style={{position: 'absolute', bottom: 0 ,justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center', width: w}}>
          {this.renderOpenButton()}
          <Animated.View style={{borderRadius: 10, paddingLeft: 25, paddingRight: 25, width: w-100, backgroundColor: 'rgba(32, 32, 32, 0.8)', height: this.state.fadeAnimContentOnPress, }}>
            <Text style={styles.titleLabelInfo}>Brand Name</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={this.handleTextFocus.bind(this)}>
              <Text style={styles.input}>
                {brandName}
              </Text>
              {this.renderClearIcon()}
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <BrandNameInput
            style={{marginTop: 10}}
            brand={_brand}
            brands={brands}
            onCancel={this.handleBrandCancel.bind(this)}
            findOrCreateBrand={this.findOrCreateBrand.bind(this)}/>
        </Modal>
      </View>
    )
  }
}
import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    createBrandName: (name) => dispatch(createBrandName(name)),
    addBrandName: (brand) => dispatch(addBrandName(brand)),
    removeBrandName: () => dispatch(removeBrandName()),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id === itemId);
  return {
    brand: item ? item.brand : null,
    selectedCategory: item ? item.category : null,
  };
};

export default connect(mapStateToProps, bindActions)(StepZeroBrand);