import React, { Component } from 'react';
import { Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { View, Text, Picker, Item, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import { CheckboxField } from 'react-native-checkbox-field';

import Category from './forms/CategoryStrip';
import BrandNameInput from './forms/BrandNameInput';

import { loadCategories } from '../../actions/filters';

import styles from './styles';

const us = require('../../../images/flags/us.png');
const uk = require('../../../images/flags/uk.png');

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
      selectedCategory: this.props.categories[this.props.selectedCategoryId - 1],
      flags: [
        {name: 'uk', icon: uk},
        {name: 'us', icon: us}
      ],
      ...props
    }
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  selectCheckbox() {
    this.setState({
        sharing: !this.state.sharing
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

  _renderSharing() {
    return (<View style={{marginBottom: 60}}>
            <Text style={styles.headinSharing}>BENEFIT FROM SHARING</Text>
            <Grid>
              <Col size={15}>
                <CheckboxField
                  label={this.state.fieldLabel}
                  onSelect={this.selectCheckbox.bind(this)}
                  selected={this.state.sharing}
                  defaultColor={'#FFFFFF'}
                  selectedColor="#333333"
                  containerStyle={styles.containerStyle}
                  labelStyle={styles.labelStyle}
                  checkboxStyle={styles.checkboxStyle}
                  labelSide="left">
                </CheckboxField>
              </Col>
              <Col size={85}>
                <Text style={styles.checkboxLabelStyle}>Web Page</Text>
              </Col>
            </Grid>
        </View>)
  }

  _renderCurrency() {
    return (<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
              <View style={{flex: 0.5}}>
                <Text style={[styles.titleLabelInfo]}>Currency</Text>
              </View>
              <View style={{flex: 0.5, paddingLeft: 12}}>
                <Text style={[styles.titleLabelInfo]}>Price</Text>
              </View>
          </View>)
  }

  _renderCurrencyInput() {
    return (<Grid style={{marginTop: -38}}>
            <Col size={48}>
              <Grid style={styles.fakeBtnContainer}>
                <Col size={80}>
                  <Picker
                    style={[styles.selectOptions, {width: 100}]}
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.currency}
                    onValueChange={(value) => this.setState({ currency: value })}>
                    <Item label="£ GBP" value="LGP" />
                    <Item label="$ USD" value="USD" />
                  </Picker>
                </Col>
                <Col size={20}>
                  <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                </Col>
              </Grid>
            </Col>
            <Col size={4} />
            <Col size={48}>
              <TextInput placeholder="Type a price" keyboardType="numeric" placeholderTextColor="#BDBDBD"  style={styles.textHalfInput} value={this.state.price} onChangeText={(price) => this.setState({price: price})} />
            </Col>
          </Grid>)
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
    const { selectedCategory } = this.state;
    const categories = this.props.categories;
    return(<View style={styles.itemInfoView}>
          <Text style={styles.titleLabelInfo}>Item Type</Text>
          <Category categories={categories} selectedCategory={selectedCategory} onCategorySelected={(cat) => this.selectCategory(cat)} scrollItemToMiddle={this.scrollItemToMiddle} />
          <Text style={styles.titleLabelInfo}>Brand Name</Text>
          <BrandNameInput brandName={this.state.brandName} findOrCreateBrand={this.findOrCreateBrand.bind(this)} clearBrandName={this.clearBrandName.bind(this)} />
          <Text style={styles.titleLabelInfo}>Item Size</Text>
          {this._rederItemSizeInput()}
          {this._renderCurrency()}
          {this._renderCurrencyInput()}
          {this._renderSharing()}
        </View>)
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
