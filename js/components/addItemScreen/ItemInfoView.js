import React, { Component } from 'react';
import { Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Content, Text, Picker, Item, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import { addItemType,
         addBrandName,
         createBrandName,
         addItemSizeCountry,
         addItemSize,
         addItemTag,
         removeItemTag,
         addItemCurrency,
         addItemPrice,
         addSharingInfo,
} from '../../actions';

import Category from './forms/CategoryStrip';
import BrandNameInput from './forms/BrandNameInput';
import CurrencyAndPrice from './forms/CurrencyAndPrice';
import ItemSize from './forms/ItemSize';
import Tags from './forms/Tags';
import FontSizeCalculator from './../../calculators/FontSize';
import { loadCategories } from '../../actions/filters';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const checkboxUncheck = require('../../../images/icons/checkbox-uncheck.png');
const checkboxChecked = require('../../../images/icons/checkbox-checked-black.png');

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: ExtraDimensions.get('STATUS_BAR_HEIGHT')
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

class ItemInfoView extends Component {

  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategoryId: React.PropTypes.number,
    posInCategories: React.PropTypes.number,
    brand: React.PropTypes.object,
    itemSizeRegion: React.PropTypes.string,
    itemSizeValue: React.PropTypes.string,
    tags: React.PropTypes.array,
    currency: React.PropTypes.string,
    price: React.PropTypes.number,
    sharingType: React.PropTypes.bool,
    sharingUrl: React.PropTypes.string,
    loadCategories: React.PropTypes.func,
    addItemType: React.PropTypes.func,
    createBrandName: React.PropTypes.func,
    addBrandName: React.PropTypes.func,
    addItemSizeCountry: React.PropTypes.func,
    addItemSize: React.PropTypes.func,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
    addItemPrice: React.PropTypes.func,
    addSharingInfo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      tmpValue: '',
      tags: ['dresses', 'black', 'red', 'white'],
    }
  }

  componentDidMount() {
    this.props.loadCategories();
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
    console.log('selectCategory', item);
    if (item.id != this.props.selectedCategoryId) {
      this.props.addItemType(item.id);
    }
  }

  findOrCreateBrand(value, act) {
    if (act) {
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

  addTags(name) {
    const tags = this.props.tags;
    const existing = _.find(tags, t => t.toLowerCase() == name.toLowerCase());
    if (!existing) {
      tags.push(name);
      this.props.addItemTag(tags);
    }
    this.setState({tmpValue: ''});
  }

  removeTag(name) {
    const { tags } = this.props;
    let newTags = _.filter(tags, x => x.toLowerCase() != name.toLowerCase());
    this.props.addItemTag(newTags);
  }

  _renderSharing() {
    const sharingWP = this.state.sharingType ? checkboxChecked : checkboxUncheck;
    const sharingFB = !this.state.sharingType ? checkboxChecked : checkboxUncheck;
    const labelColorWP = this.state.sharingType ? '#000000' : '#7f7f7f';
    const labelColorFB = !this.state.sharingType ? '#000000' : '#7f7f7f';
    const checkBoxSize = new FontSizeCalculator(30).getSize();
    return (<View style={{marginBottom: 60}}>
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
    const { categories, countries, itemSizes } = this.props;
    const { selectedCategoryId, brand, itemSizeRegion, itemSizeValue, currency, price, tags } = this.props;
    return(<View style={[styles.itemInfoView, { paddingBottom: 100}]}>
              <Text style={styles.titleLabelInfo}>Item Type</Text>
              <Category
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  onCategorySelected={(cat) => this.selectCategory(cat)}/>
              <Text style={styles.titleLabelInfo}>Brand Name</Text>
              <BrandNameInput
                  brand={brand}
                  findOrCreateBrand={this.findOrCreateBrand.bind(this)}
                  clearBrandName={this.clearBrandName.bind(this)} />
              <Text style={styles.titleLabelInfo}>Item Size</Text>
              <ItemSize
                  itemSizeRegion={itemSizeRegion}
                  itemSizeValue={itemSizeValue}
                  updateValue={this.updateValue.bind(this)} />
              <Text style={[styles.titleLabelInfo, {marginTop: 20}]}>Add tags</Text>
              <View style={{margin: 5}}>
                <TextInput
                    returnKeyType="done"
                    placeholder=""
                    value={this.state.tmpValue}
                    keyboardType="default"
                    placeholderTextColor="#BDBDBD"
                    style={styles.textInput}
                    onSubmitEditing={(event) => this.addTags(event.nativeEvent.text)}
                    onChangeText={(text) => this.setState({tmpValue: text})} />
                <Tags tags={tags} removeTag={this.removeTag.bind(this)} />
              </View>
              <CurrencyAndPrice currency={currency} price={price} updateValue={this.updateValue.bind(this)} />
              {/*this._renderSharing()*/}
        </View>)
  }

}

function bindActions(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    addItemType: (typeId) => dispatch(addItemType(typeId)),
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
    console.log('item selectedCategoryId', item.selectedCategoryId);
    return {
      categories: state.filters.categories,
      selectedCategoryId: item.selectedCategoryId,
      brand: item.brand,
      itemSizeRegion: item.itemSizeRegion,
      itemSizeValue: item.itemSizeValue,
      tags: item.tags,
      currency: item.currency,
      price: item.price,
    };
  }

  return {
    categories: state.filters.categories,
    selectedCategoryId: null,
    brand: null,
    itemSizeRegion: null,
    itemSizeValue: null,
    tags: [],
    currency: 'USD',
    price: 0,
  }
};

export default connect(mapStateToProps, bindActions)(ItemInfoView);
