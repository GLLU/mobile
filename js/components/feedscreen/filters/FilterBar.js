import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import {
  MKRangeSlider
} from 'react-native-material-kit';

import ValueText from './ValueText';
import CategoryStrip from './CategoryStrip';

import styles from '../styles';

class FilterView extends Component {
  static propTypes = {
    openFilter: React.PropTypes.func,
    categories: React.PropTypes.array,
    minPrice: React.PropTypes.number,
    maxPrice: React.PropTypes.number,
    filterHeight: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      openFilter: true,
      fromPrice: this.props.minPrice,
      toPrice: this.props.maxPrice,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  filterByCategory(item) {
    console.log('Call API filter by category');
    const selectedCategory = this.state.selectedCategory;
    const selected = selectedCategory && selectedCategory.id === item.id ? null : item;
    this.setState({
      selectedCategory: selected
    });
    console.log(`Filter by category Id: ${item.id}`);
  }

  filterByPrice(min, max) {
    console.log('Call API filter by price');
    this.setState({
      fromPrice: parseInt(min),
      toPrice: parseInt(max),
    });
  }

  clearFilter() {
    console.log('Clear Filter');
    this.setState({
      selectedCategory: null,
      fromPrice: this.props.minPrice,
      toPrice: this.props.maxPrice
    });
  }

  _renderFilterHeader(){
    const labelColor = this.state.selectedCategory || this.state.fromPrice != 1 || this.state.toPrice != 1000 ? '#1DE9B6' : '#212121';
    return (
      <View>
        <Grid style={styles.filter}>
          <Col size={10}>
            <Button transparent onPress={() => this.props.openFilter(this.props.filterHeight)} style={styles.btnFilter}>
              <Icon name="md-options" style={[styles.normalBtn, { color: labelColor }]} />
            </Button>
          </Col>
          <Col size={20}>
            <Button transparent onPress={() => this.props.openFilter(this.props.filterHeight)} style={styles.btnFilter}>
              <Text style={[styles.Textlabel, { color: labelColor }]}>Filter by</Text>
            </Button>
          </Col>
          <Col size={50}>
            {this._rederFilterText()}
          </Col>
          <Col size={20}>
            <Button transparent onPress={() => this.clearFilter()} style={styles.btnFilter}>
              <Text style={styles.TextlabelReset}>RESET</Text>
            </Button>
          </Col>
        </Grid>
      </View>);
  }

  _renderCategories() {
    const { selectedCategory } = this.state;
    const categories = this.props.categories;
    return (
      <CategoryStrip categories={categories} selectedCategory={selectedCategory} onCategorySelected={(cat) => this.filterByCategory(cat)}/>)
  }

  _renderSlider() {
    const { minPrice, maxPrice } = this.props;
    return (
      <View style={styles.sliderFilters}>
        <MKRangeSlider
          ref="rangeSlider"
          step={1}
          min={minPrice}
          max={maxPrice}
          minValue={this.state.fromPrice}
          maxValue={this.state.toPrice}
          upperTrackColor={'#212121'}
          lowerTrackColor={'#212121'}
          thumbRadius={6}
          onChange={(curValue) => this.rangeValueText.onChange(curValue.min.toFixed(0), curValue.max.toFixed(0))}
          onConfirm={(curValue) => this.filterByPrice(curValue.min, curValue.max)}
          />
        <ValueText ref={(ref) => this.rangeValueText = ref} min={this.state.fromPrice} max={this.state.toPrice} rangeText={`${minPrice}~${maxPrice}`} />
      </View>)
  }

  _rederFilterText() {
    const filterOnChangeCategory = this.state.selectedCategory;
    const filterOnChangePrice = this.state.fromPrice != this.props.minPrice || this.state.toPrice != this.props.maxPrice;
    if (filterOnChangePrice === false && filterOnChangeCategory === null) {
      return (
        <View>
          <Text style={styles.TextResults}>All Results</Text>
        </View>);
    } else {
      const filters = [];
      if (filterOnChangeCategory) {
        filters.push(this.state.selectedCategory.attributes.name);
      }
      if (filterOnChangePrice) {
        filters.push(`₤${this.state.fromPrice} - ₤${this.state.toPrice}`);
      }
      return (
        <View>
          <Text style={styles.TextResults}>
            {filters.join(', ')}
          </Text>
        </View>);
    }
  }

  render() {
    return(
      <View>
        {this._renderFilterHeader()}
        <View style={[styles.filterActions, {height: this.props.filterHeight}]}>
          <View style={styles.filterActionsGrid}>
            {this._renderCategories()}
            {this._renderSlider()}
          </View>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return { };
}

const mapStateToProps = state => ({
  categories: state.filters.categories,
  minPrice: state.filters.minPrice,
  maxPrice: state.filters.maxPrice
});

export default connect(mapStateToProps, bindActions)(FilterView);
