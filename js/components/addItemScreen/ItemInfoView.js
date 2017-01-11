import React, { Component } from 'react';
import { Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Content, Text, Picker, Item, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import Category from './forms/CategoryStrip';
import BrandNameInput from './forms/BrandNameInput';
import CurrencyAndPrice from './forms/CurrencyAndPrice';
import FontSizeCalculator from './../../calculators/FontSize';

import { loadCategories } from '../../actions/filters';

const us = require('../../../images/flags/us.png');
const uk = require('../../../images/flags/uk.png');
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
    color: '#757575',
    fontWeight: '400',
    marginBottom: 8
  },
  textInput: {
    width: w - 40,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textHalfInput: {
    width: w / 2 - 30,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  selectOptions: {
    backgroundColor: 'transparent'
  },
  arrowSelect: {
    color: '#BDBDBD',
    fontSize: new FontSizeCalculator(18).getSize(),
    paddingTop: 10
  },
  fakeBtnContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingTop: 5,
    height: 50,
  },
  flagSelectOptions: {
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btnTagAnother: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#333333',
    height: 50,
    width: w / 2 - 28,
    borderRadius: 0
  },
  btnContinue: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#1DE9B6',
    height: 50,
    width: w / 2 - 28,
    borderRadius: 0
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  headinSharing: {
    fontSize: new FontSizeCalculator(20).getSize(),
    fontWeight: '500',
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
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 15
  },
  actionsContainer: {
    flex: 1,
    width: w,
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 0
  },
});

class ItemInfoView extends Component {

  static propTypes = {
    loadCategories: React.PropTypes.func,
    categories: React.PropTypes.array,
    selectedCategoryId: React.PropTypes.number,
    brandName: React.PropTypes.string,
    itemSizeCountry: React.PropTypes.string,
    itemSizeNumber: React.PropTypes.number,
    currency: React.PropTypes.string,
    price: React.PropTypes.number,
    sharing: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: null,
      flags: [
        {name: 'uk', icon: uk},
        {name: 'us', icon: us}
      ],
      ...props
    }
  }

  componentDidMount() {
    var categories = this.props.loadCategories();
    new Promise((resolve, reject) => {
      resolve(categories);
    }).then((data) => {
      this.setState({categories: this.props.categories, selectCategory: this.props.categories[this.props.selectedCategoryId - 1]})
    });
  }

  selectCategory(item) {
    const selectedCategory = this.state.selectedCategory;
    const selected = selectedCategory && selectedCategory.id === item.id ? selectedCategory : item;
    this.setState({
      selectedCategory: selected
    });
    console.log(`Selet category Id: ${item.id}`);
  }

  findOrCreateBrand(value, act) {
    if (act) {
      this.callApiCreateNewBrand(value);
    } else {
      this.setState({
        brandName: value.name
      });
      console.log(`Save brand ID: ${value.id}`);
    }
  }

  clearBrandName() {
    this.setState({brandName: ''});
  }

  callApiCreateNewBrand(brandName) {
    console.log(`Call Api create new brand: ${brandName}`);
  }

  updateValue(key, value) {
    this.setState({[key]: value});
  }

  _renderSharing() {
    const sharingCheckBox = this.state.sharing ? checkboxChecked : checkboxUncheck;
    return (<View style={{marginBottom: 60}}>
            <Text style={styles.headinSharing}>BENEFIT FROM SHARING</Text>
            <Grid>
              <Col size={15}>
                <TouchableOpacity style={{marginTop: 10}} onPress={() => this.setState({sharing: !this.state.sharing})}>
                  <Image source={sharingCheckBox} style={{height:30, width: 30, borderRadius: 15}} />
                </TouchableOpacity>
              </Col>
              <Col size={85}>
                <Text style={styles.checkboxLabelStyle}>Web Page</Text>
              </Col>
            </Grid>
        </View>)
  }

  _rederItemSizeInput() {
    let flagIcon = null;
    this.state.flags.map((flag) => {
      if (flag.name == this.state.itemSizeCountry) {
        flagIcon = flag.icon;
      }
    });
    return (<Grid>
              <Col size={48}>
                <Grid style={styles.fakeBtnContainer}>
                  <Col size={20}>
                    <Image source={flagIcon} style={styles.flagSelectOptions} />
                  </Col>
                  <Col size={60}>
                    <Picker
                      style={styles.selectOptions}
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.state.itemSizeCountry}
                      onValueChange={(value) => this.setState({ itemSizeCountry: value })}>
                      <Item label="UK" value="uk" />
                      <Item label="US" value="us" />
                    </Picker>
                  </Col>
                  <Col size={20}>
                    <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                  </Col>
                </Grid>
              </Col>
              <Col size={4} />
              <Col size={48}>
                <Grid style={styles.fakeBtnContainer}>
                  <Col size={80}>
                    <Picker
                      style={[styles.selectOptions, {width: 100}]}
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.state.itemSizeNumber}
                      onValueChange={(value) => this.setState({ itemSizeNumber: value })}>
                      <Item label="1" value="1" />
                      <Item label="2" value="2" />
                      <Item label="3" value="3" />
                      <Item label="4" value="4" />
                    </Picker>
                  </Col>
                  <Col size={20}>
                    <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                  </Col>
                </Grid>
              </Col>
            </Grid>)
  }

  render() {
    const { categories, selectedCategory } = this.state;
    return(<Container style={styles.itemInfoView}>
              <Content scrollEnabled={false}>
                  <Text style={styles.titleLabelInfo}>Item Type</Text>
                  <Category categories={categories} selectedCategory={selectedCategory} onCategorySelected={(cat) => this.selectCategory(cat)} />
                  <Text style={styles.titleLabelInfo}>Brand Name</Text>
                  <BrandNameInput brandName={this.state.brandName} findOrCreateBrand={this.findOrCreateBrand.bind(this)} clearBrandName={this.clearBrandName.bind(this)} />
                  <Text style={styles.titleLabelInfo}>Item Size</Text>
                  {this._rederItemSizeInput()}
                  <CurrencyAndPrice currency={this.state.currency} price={this.state.price} updateValue={this.updateValue.bind(this)} />
                  {this._renderSharing()}
              </Content>
        </Container>)
  }

}

function bindActions(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
}

const mapStateToProps = state => ({
  categories: state.filters.categories,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(ItemInfoView);
