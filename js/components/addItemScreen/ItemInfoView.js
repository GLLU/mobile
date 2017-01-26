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
         addItemCurrency,
         addItemPrice,
         addSharingInfo,
} from '../../actions';

import Category from './forms/CategoryStrip';
import BrandNameInput from './forms/BrandNameInput';
import CurrencyAndPrice from './forms/CurrencyAndPrice';
import ItemSize from './forms/ItemSize';
import FontSizeCalculator from './../../calculators/FontSize';

import { loadCategories } from '../../actions/filters';

const checkboxUncheck = require('../../../images/icons/checkbox-uncheck.png');
const checkboxChecked = require('../../../images/icons/checkbox-checked-black.png');

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20
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
    width: w - 20,
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
    loadCategories: React.PropTypes.func,
    categories: React.PropTypes.array,
    selectedCategoryId: React.PropTypes.number,
    posInCategories: React.PropTypes.number,
    brand: React.PropTypes.object,
    itemSizeCountry: React.PropTypes.string,
    itemSizeNumber: React.PropTypes.number,
    currency: React.PropTypes.string,
    price: React.PropTypes.number,
    sharingType: React.PropTypes.bool,
    sharingUrl: React.PropTypes.string,
    addItemType: React.PropTypes.func,
    createBrandName: React.PropTypes.func,
    addBrandName: React.PropTypes.func,
    addItemSizeCountry: React.PropTypes.func,
    addItemSize: React.PropTypes.func,
    addItemPrice: React.PropTypes.func,
    addSharingInfo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: null,
      ...props
    }
  }

  componentDidMount() {
    var self = this;
    var categories = this.props.loadCategories();
    new Promise((resolve, reject) => {
      resolve(categories);
    }).then((data) => {
      var category = self.findCategoryById(categories, this.props.selectedCategoryId)
      self.setState({categories: categories, selectCategory: category});
    });
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
    const selectedCategory = this.state.selectedCategory;
    const selected = selectedCategory && selectedCategory.id === item.id ? selectedCategory : item;
    this.setState({
      selectedCategory: selected
    });
    this.props.addItemType(selected);
    console.log(`Selet category Id: ${item.id}`);
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
      case 'itemSizeCountry':
        this.props.addItemSizeCountry(value);
        break;
      case 'itemSizeNumber':
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
    const { categories, selectedCategory } = this.state;
    const { brand, itemSizeCountry, currency, price } = this.props;
    return(<Container style={styles.itemInfoView}>
              <Content scrollEnabled={false}>
                {/*
                  <Text style={styles.titleLabelInfo}>Item Type</Text>
                  <Category categories={categories} selectedCategory={selectedCategory} onCategorySelected={(cat) => this.selectCategory(cat)} posInCategories={this.props.posInCategories} />
                  */}
                  <Text style={styles.titleLabelInfo}>Brand Name</Text>
                  <BrandNameInput brand={brand} findOrCreateBrand={this.findOrCreateBrand.bind(this)} clearBrandName={this.clearBrandName.bind(this)} />
                  {/*
                  <Text style={styles.titleLabelInfo}>Item Size</Text>
                  <ItemSize itemSizeCountry={this.state.itemSizeCountry} itemSizeNumber={this.state.itemSizeNumber} updateValue={this.updateValue.bind(this)} />
                */}
                  <CurrencyAndPrice currency={currency} price={price} updateValue={this.updateValue.bind(this)} />
                  {/*this._renderSharing()*/}
              </Content>
        </Container>)
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
    addItemCurrency: (currency) => dispatch(addItemCurrency(currency)),
    addItemPrice: (price) => dispatch(addItemPrice(price)),
    addSharingInfo: (type, url) => dispatch(addSharingInfo(type, url)),
  };
}

const mapStateToProps = state => {
  const tags = state.api.tag ? state.api.tag.data : [];
  return {
    categories: tags,
    ...state.uploadLook,
  };
};

export default connect(mapStateToProps, bindActions)(ItemInfoView);
