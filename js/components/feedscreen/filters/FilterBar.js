import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import RadioButtons from 'react-native-radio-buttons';
import {View, Text, Switch, TouchableWithoutFeedback, Dimensions, StyleSheet} from 'react-native';
import SearchBar from '../SearchBar'

import CategoryStrip from './CategoryStrip';
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
  btnFilter: {
    marginLeft: 5,
    alignSelf: 'center',
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
  Textlabel: {
    paddingTop: 0,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  TextResults: {
    paddingTop: 12,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  filterActions: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginBottom: 10,
    height: 150,
  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',
    height: 90,
  },
  radioView: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flex: 1,
  },
  radioOption: { // the box
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  radioOptionSelected: {
    borderBottomColor: MKColor.Teal,
    borderBottomWidth: 2,
  },
  radioBtnText: { //the text
    color: 'lightgrey',
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 5
  },
  radioBtnTextSelected: { //the text
    color: MKColor.Teal
  },
});

import { loadCategories } from '../../../actions/filters';

const feedTypes = [ 'Best Match', 'Recent' ];
class FilterView extends Component {
  static propTypes = {
    loadCategories: React.PropTypes.func,
    categories: React.PropTypes.array,
    minPrice: React.PropTypes.number,
    maxPrice: React.PropTypes.number,
    filterFeed: React.PropTypes.func,
    clearSearchTerm: React.PropTypes.func,
    onHeightChanged: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      openFilter: true,
      feedTypeSelectedOption: 'Best Match',
      isOpen: false
    };

    this.height = 0;
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
    this.setState({ isOpen: !this.state.isOpen });
  }

  _handleCloseFilter() {
    this.setState({ isOpen: false });
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
          <Text style={myStyles.TextResults}>
            {filters.join(', ')}
          </Text>
        </View>);
  }

  renderRadioContainer(optionNodes){
    return (
      <View style={myStyles.radioView}>
        {optionNodes}
      </View>
    )
  }

  renderRadioOption(option, selected, onSelect, index) {
    return (
      <View key={index} style={[myStyles.radioOption, selected ? myStyles.radioOptionSelected : null]}>
        <TouchableWithoutFeedback onPress={onSelect} >
          <View >
            <Text style={[ myStyles.radioBtnText, selected ? myStyles.radioBtnTextSelected : null]}>{option}</Text>
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

  _handleLayoutChanged(e) {
    const height = e.nativeEvent.layout.height;
    if (height != this.height) {
      this.height = height;
      this.props.onHeightChanged(height);
    }
  }

  _renderFilters() {
    return(
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
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
    const labelColor = this.state.selectedCategory  ? '#1DE9B6' : '#212121';
    return(
      <View style={myStyles.container} onLayout={e => this._handleLayoutChanged(e)}>
        <View style={myStyles.filter}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button transparent onPress={() => this.toggleFilter()} style={myStyles.btnFilter}>
                <Icon name="md-options" style={[myStyles.normalBtn, { color: labelColor }]} />
              </Button>
            <Button transparent onPress={() => this.toggleFilter()} style={myStyles.btnFilter}>
                <Text style={[myStyles.Textlabel, { color: labelColor }]}>Filter by</Text>
              </Button>
              {this._rederFilterText()}
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5}}>
            <Button transparent onPress={() => this.clearFilter()} style={[myStyles.btnReset]} textStyle={myStyles.TextlabelReset}>
              RESET
              </Button>
            {this.state.isOpen ?
              <Button transparent iconRight onPress={() => this._handleCloseFilter()} style={[myStyles.btnCloseFilter]}>
                  <Icon name="ios-close-circle-outline" style={[myStyles.smallBtn]} />
              </Button>
              :
              null
            }
          </View>
        </View>
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
