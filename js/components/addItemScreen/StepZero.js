import React, { Component } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity,View, Text } from 'react-native';
import {  Icon } from 'native-base';
import {
  addBrandName,
  createBrandName,
  removeBrandName,
} from '../../actions';

import BrandNameInput from './forms/BrandNameInput';
import FontSizeCalculator from './../../calculators/FontSize';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';

const styles = StyleSheet.create({
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    color: '#7f7f7f',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(15).getSize(),
    marginBottom: 8
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
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


class StepZero extends BaseComponent {
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
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      brandName: props.brand ? props.brand.name : null,
    });
  }

  findOrCreateBrand(value, createNew) {
    const brandName = typeof value === 'string' ? value : value.name;
    const f = createNew ? this.props.createBrandName : this.props.addBrandName;
    f(value).then(() => {
      setTimeout(() => {
        this.setState({modalVisible: false, brandName});
      }, 500);
    }).catch(err => {
      console.log('error', err);
    })

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

  renderClearIcon() {
    if (this.state.brandName) {
      return (
        <TouchableOpacity
          style={styles.iconCheckCompleteContainer}
          onPress={this.handleClearBrandName.bind(this)}
        >
          <Icon name="md-close-circle" style={styles.iconCheckComplete} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { brands, brand} = this.props;
    const { brandName, modalVisible } = this.state;
    const _brand = brandName ? brand : null;
    return (
      <View style={{flex: 1, padding: 25}}>
        <Text style={styles.titleLabelInfo}>Brand Name</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={this.handleTextFocus.bind(this)}>
          <Text
            style={styles.input}
          >
            {brandName}
          </Text>
          {this.renderClearIcon()}
        </TouchableOpacity>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}
        >
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
  const item = _.find(items, item => item.id == itemId);
  return {
    brand: item ? item.brand : null,
  };
};

export default connect(mapStateToProps, bindActions)(StepZero);