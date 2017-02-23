import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import RadioButtons from 'react-native-radio-buttons';
import {View, Text, Switch, TouchableWithoutFeedback, TouchableHighlight, Dimensions, StyleSheet} from 'react-native';
import SearchBar from '../SearchBar'

import CategoryStrip from './CategoryStrip';

import styles from '../styles';

const myStyles = StyleSheet.create({
  filter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 5,
    paddingBottom: 10,
    height: 45,
  },
  btnFilter: {
    marginLeft: 5,
  },
  btnCloseFilter: {
    marginLeft: 15,
    alignSelf: 'center',
    marginRight: 5,
  },
  btnReset: {
    alignSelf: 'center',
  },
  TextlabelReset: {
    color: '#757575',
    fontSize: 13,
    fontWeight: '500',
  },
  smallBtn: {
    fontSize: 15
  },
});

import { loadCategories } from '../../../actions/filters';
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

const feedTypes = [ 'Best Match', 'Recent' ];
class FilterView extends Component {
  static propTypes = {
    loadCategories: React.PropTypes.func,
    categories: React.PropTypes.array,
    minPrice: React.PropTypes.number,
    maxPrice: React.PropTypes.number,
    filterFeed: React.PropTypes.func,
    clearSearchTerm: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      openFilter: true,
      feedTypeSelectedOption: 'Best Match',
      isOpen: false,
      filterStatusIcon: 'ios-arrow-forward'
    };
  }

  componentWillMount() {
    this.props.loadCategories();
  }

  filterByCategory(item) {
    const selectedCategory = this.state.selectedCategory;
    const selected = selectedCategory && selectedCategory.id === item.id ? false : item;
    this.setState({
      selectedCategory: selected
    });
    let category = selected === false ? '' : item.name;
    let type = this.state.feedTypeSelectedOption === 'Best Match' ? 'relevant' : 'recent'
    this.props.filterFeed(type, category);
    console.log(`Filter by category Id: ${item.id}`);
  }

  clearFilter() {
    console.log('Clear Filter');
    this.setState({
      selectedCategory: null,
    });
    let type = this.state.feedTypeSelectedOption === 'Best Match' ? 'relevant' : 'recent';
    this.props.filterFeed(type, '')
    this.props.clearSearchTerm();
  }

  toggleFilter() {
    let filterStatusIcon = !this.state.isOpen ? "ios-arrow-down" : "ios-arrow-forward"
    this.setState({ isOpen: !this.state.isOpen, filterStatusIcon });
  }

  _handleCloseFilter() {
    this.setState({ isOpen: false });
  }

  _renderFilterHeader(){
    const labelColor = this.state.selectedCategory  ? '#1DE9B6' : '#212121';
    return (
    <TouchableHighlight onPress={() => this.toggleFilter()}>
      <View style={myStyles.filter}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button transparent  style={myStyles.btnFilter}>
              <Icon name="md-options" style={[styles.normalBtn, { color: labelColor }]} />
            </Button>
          <Button transparent onPress={() => this.toggleFilter()} style={myStyles.btnFilter}>
              <Text style={[styles.Textlabel, { color: labelColor }]}>Filter by</Text>
            </Button>
            {this._rederFilterText()}
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5}}>
          {this.state.isOpen ?
         <Button transparent onPress={() => this.clearFilter()} style={[myStyles.btnReset]} textStyle={myStyles.TextlabelReset}>
            RESET
         </Button>
            :
            null
          }
          <Button transparent iconRight onPress={() => this._handleCloseFilter()} style={[myStyles.btnCloseFilter]}>
            <Icon name={this.state.filterStatusIcon} style={[myStyles.smallBtn]} />
          </Button>
        </View>

      </View>
    </TouchableHighlight>);
  }

  _renderCategories() {
    const { selectedCategory } = this.state;
    const categories = this.props.categories;
    return (
      <CategoryStrip categories={categories} selectedCategory={selectedCategory} onCategorySelected={(cat) => this.filterByCategory(cat)}/>)
  }


  _rederFilterText() {
    const filterOnChangeCategory = this.state.selectedCategory;
      const filters = [];
      if (filterOnChangeCategory) {
        filters.push(this.state.selectedCategory.name);
      }
      return (
        <View>
          <Text style={styles.TextResults}>
            {filters.join(', ')}
          </Text>
        </View>);
  }

  renderRadioContainer(optionNodes){
    return (
      <View style={styles.radioView}>
        {optionNodes}
      </View>
    )
  }

  renderRadioOption(option, selected, onSelect, index) {
    return (
      <View key={index} style={[styles.radioOption, selected ? styles.radioOptionSelected : null]}>
        <TouchableWithoutFeedback onPress={onSelect} >
          <View >
            <Text style={[ styles.radioBtnText, selected ? styles.radioBtnTextSelected : null]}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  setFeedTypeSelectedOption(feedTypeSelectedOption){
    this.setState({
      feedTypeSelectedOption
    })
    let isCategorySelected = this.state.selectedCategory ? this.state.selectedCategory.name : '';
    let type = feedTypeSelectedOption === 'Best Match' ? 'relevant' : 'recent'
    this.props.filterFeed(type, isCategorySelected)
  }

  _renderFilters() {
    return(
      <View style={[styles.filterActions, {height: this.props.filterHeight}]}>
        <View style={styles.filterActionsGrid}>
          {this._renderCategories()}
        </View>
        <RadioButtons
          options={ feedTypes }
          onSelection={ this.setFeedTypeSelectedOption.bind(this) }
          selectedOption={ this.state.feedTypeSelectedOption }
          renderOption={ this.renderRadioOption }
          renderContainer={ this.renderRadioContainer }
        />
      </View>
    )
  }

  render() {
    return(
      <View>
        {this._renderFilterHeader()}
        {this.state.isOpen ? this._renderFilters() : null}
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
}

const mapStateToProps = state => {
  const tags = state.filters.categories ? state.filters.categories : [];
  return {
    categories: tags,
    minPrice: state.filters.minPrice,
    maxPrice: state.filters.maxPrice
  }
};

export default connect(mapStateToProps, bindActions)(FilterView);
