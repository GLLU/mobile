import React, { Component } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { View, Container, Content, Text, Picker, Item, Icon } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  createLookItem,
  selectLookItem,
  addItemType,
  addBrandName,
  createBrandName,
  addItemSizeCountry,
  addItemSize,
  addItemTag,
  removeItemTag,
  addItemCurrency,
  addItemPrice,
  addSharingInfo,
  loadCategories,
} from '../../actions';

import Category from '../common/CategoryStrip';
import BrandNameInput from './forms/BrandNameInput';
import TagInput from './forms/TagInput';
import CurrencyAndPrice from './forms/CurrencyAndPrice';
import ItemSize from './forms/ItemSize';
import ImageWithTags from '../common/ImageWithTags';
import FontSizeCalculator from './../../calculators/FontSize';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Gllu from '../common';

import { IMAGE_VIEW_WIDTH } from './styles';
const checkboxUncheck = require('../../../images/icons/checkbox-uncheck.png');
const checkboxChecked = require('../../../images/icons/checkbox-checked-black.png');


const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    color: '#7f7f7f',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(15).getSize(),
    marginBottom: 8
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  headinSharing: {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: new FontSizeCalculator(20).getSize(),
    fontWeight: '300',
    marginTop: 15,
    paddingTop: 20
  },
  legendLabel: {
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 8
  },
  containerStyle: {
  },
  labelStyle: {
    flex: 1
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 13,
  },
  checkboxLabelStyle: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '300',
    paddingTop: 15
  },
  textInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
  textInfo: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(12).getSize(),
    paddingTop: 5,
    paddingLeft: 10
  },
  iconInfo: {
    fontSize: new FontSizeCalculator(35).getSize()
  }
});


class StepOne extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    newTag: React.PropTypes.bool,
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.object,
    brand: React.PropTypes.object,
    itemSizeRegion: React.PropTypes.string,
    itemSizeValue: React.PropTypes.string,
    currency: React.PropTypes.string,
    price: React.PropTypes.number,
    sharingType: React.PropTypes.bool,
    sharingUrl: React.PropTypes.string,
    addItemType: React.PropTypes.func,
    createBrandName: React.PropTypes.func,
    addBrandName: React.PropTypes.func,
    addItemSizeCountry: React.PropTypes.func,
    addItemSize: React.PropTypes.func,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
    addItemPrice: React.PropTypes.func,
    addSharingInfo: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    selectLookItem: React.PropTypes.func,
    continueAction: React.PropTypes.func,
    tagAnotherAction: React.PropTypes.func,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
  }

  findCategoryById(categories, id) {
    let category = null;
    categories.map((cate, index) => {
      if (parseInt(cate.id) == id){
        category = cate;
      }
    });
    return category;
  }

  selectCategory(item) {
    if (item.id != this.props.selectedCategory) {
      this.props.addItemType(item);
    }
  }

  findOrCreateBrand(value, createNew) {
    if (createNew) {
      this.props.createBrandName(value);
    } else {
      this.props.addBrandName(value);
    }
  }

  clearBrandName() {
    this.setState({brandName: ''});
  }

  updateValue(key, value) {
    switch (key) {
      case 'itemSizeRegion':
        this.props.addItemSizeCountry(value);
        break;
      case 'itemSizeValue':
        this.props.addItemSize(value);
        break;
      case 'currency':
        this.props.addItemCurrency(value);
        break;
      case 'price':
        this.props.addItemPrice(value);
        break;
      case 'sharingUrl':
        this.props.addSharingInfo(this.state.sharingType, value);
        break;
    }
  }

  _renderSharing() {
    const sharingWP = this.state.sharingType ? checkboxChecked : checkboxUncheck;
    const sharingFB = !this.state.sharingType ? checkboxChecked : checkboxUncheck;
    const labelColorWP = this.state.sharingType ? '#000000' : '#7f7f7f';
    const labelColorFB = !this.state.sharingType ? '#000000' : '#7f7f7f';
    const checkBoxSize = new FontSizeCalculator(30).getSize();
    return (
          <View style={{}}>
            <Text style={styles.headinSharing}>BENEFIT FROM SHARING</Text>
            <Grid>
              <Col size={15}>
                <TouchableOpacity style={{marginTop: 10}} onPress={() => this.setState({sharingType: !this.state.sharingType})}>
                  <Image source={sharingWP} style={{height: checkBoxSize, width: checkBoxSize, borderRadius: checkBoxSize / 2}} />
                </TouchableOpacity>
              </Col>
              <Col size={85}>
                <Text style={[styles.checkboxLabelStyle, {color: labelColorWP}]}>Web Page</Text>
              </Col>
            </Grid>
            <Grid>
              <Col size={15}>
                <TouchableOpacity style={{marginTop: 10}} onPress={() => this.setState({sharingType: !this.state.sharingType})}>
                  <Image source={sharingFB} style={{height: checkBoxSize, width: checkBoxSize, borderRadius: checkBoxSize / 2}} />
                </TouchableOpacity>
              </Col>
              <Col size={85}>
                <Text style={[styles.checkboxLabelStyle, {color: labelColorFB}]}>Facebook Page</Text>
              </Col>
            </Grid>
            <TextInput placeholder="Please enter item url" keyboardType="url" placeholderTextColor="#000"  style={styles.textInput} value={this.state.sharingUrl} onChangeText={(url) => this.updateValue('sharingUrl', url)} />
            <Grid style={{padding: 20}}>
              <Col size={10}>
                <Icon style={styles.iconInfo} name="ios-information-circle-outline" />
              </Col>
              <Col size={90}>
                <Text style={styles.textInfo}>Learn about getting paid and our fees</Text>
              </Col>
            </Grid>
        </View>)
  }

  render() {
    const { items, image, createLookItem, selectLookItem, } = this.props;
    const { categories, countries, itemSizes, selectedCategory, brand, itemSizeRegion, itemSizeValue, currency, price } = this.props;
    return(
      <View style={{flex: 1}}>
        <ScrollView scrollEnabled={true} style={{marginTop: 0, paddingHorizontal: 20}}>
          <Grid>
            <Row style={styles.row}>
              <View style={{padding: 15, alignItems: 'center', alignSelf: 'center'}}>
                <ImageWithTags
                    items={items}
                    image={image}
                    createLookItem={createLookItem}
                    selectLookItem={selectLookItem}
                    width={IMAGE_VIEW_WIDTH}/>
              </View>
            </Row>
            <Row style={styles.row}>
              <Text style={styles.titleLabelInfo}>Item Type</Text>
              <View style={{backgroundColor: '#FFFFFF'}}>
                <Category
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelected={(cat) => this.selectCategory(cat)}/>
              </View>
            </Row>
            <Row style={styles.row}>
              <Text style={styles.titleLabelInfo}>Brand Name</Text>
              <BrandNameInput
                  brand={brand}
                  findOrCreateBrand={this.findOrCreateBrand.bind(this)}
                  clearBrandName={this.clearBrandName.bind(this)} />
            </Row>
            <Row style={styles.row}>
              <Text style={styles.titleLabelInfo}>Item Size</Text>
              <ItemSize
                  itemSizeRegion={itemSizeRegion}
                  itemSizeValue={itemSizeValue}
                  updateValue={this.updateValue.bind(this)} />
            </Row>
            <Row style={styles.row}>
              <Text style={[styles.titleLabelInfo, {marginTop: 20}]}>Add tags</Text>
              <View style={{margin: 5}}>
                <TagInput/>
              </View>
            </Row>
              {/*
                <CurrencyAndPrice currency={currency} price={price} updateValue={this.updateValue.bind(this)} />
              */}
              {/*this._renderSharing()*/}
            <Row style={[styles.row, {paddingBottom: 60}]}>
              <View style={{flex: 1, backgroundColor: 'transparent', padding: 20, alignItems: 'center'}}>
                <Gllu.Button onPress={this.props.continueAction} text='CONTINUE'/>
              </View>
            </Row>
          </Grid>
        </ScrollView>
        <KeyboardSpacer onToggle={(state, space) => console.log('keyboard', state, space)}/>
      </View>
    )
  }
}
import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    createLookItem: (tag) => dispatch(createLookItem(tag)),
    selectLookItem: (tag) => dispatch(selectLookItem(tag)),
    addItemType: (type) => dispatch(addItemType(type)),
    createBrandName: (name) => dispatch(createBrandName(name)),
    addBrandName: (brand) => dispatch(addBrandName(brand)),
    addItemSizeCountry: (size) => dispatch(addItemSizeCountry(size)),
    addItemSize: (number) => dispatch(addItemSize(number)),
    addItemTag: (tag) => dispatch(addItemTag(tag)),
    removeItemTag: (tag) => dispatch(removeItemTag(tag)),
    addItemCurrency: (currency) => dispatch(addItemCurrency(currency)),
    addItemPrice: (price) => dispatch(addItemPrice(price)),
    addSharingInfo: (type, url) => dispatch(addSharingInfo(type, url)),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id == itemId);
  if (item) {
    return {
      navigation: state.cardNavigation,
      categories: state.filters.categories,
      ...state.uploadLook,
      selectedCategory: item.selectedCategory,
      brand: item.brand,
      itemSizeRegion: item.itemSizeRegion,
      itemSizeValue: item.itemSizeValue,
      currency: item.currency,
      price: item.price,
    };
  }

  return {
    navigation: state.cardNavigation,
    ...state.uploadLook,
    selectedCategory: null,
    brand: null,
    itemSizeRegion: null,
    itemSizeValue: null,
    currency: 'USD',
    price: 0,
  }
};

export default connect(mapStateToProps, bindActions)(StepOne);