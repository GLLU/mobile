import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import RadioButtons from 'react-native-radio-buttons';
import {View, Text, Switch, TouchableWithoutFeedback, TouchableHighlight, Dimensions, StyleSheet} from 'react-native';
import SearchBar from '../SearchBar'

import CategoryStrip from '../../common/CategoryStrip';
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
    fontSize: 15,
    color: 'grey',
  },
  Textlabel: {
    paddingTop: 0,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  TextResults: {
    paddingTop: 12,
    marginLeft: 10,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  filterActions: {
    backgroundColor: '#F5F5F5',
    padding: 5,
    marginBottom: 10,
    height: 150,
  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    height: 110,
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

const BEST_MATCH = 'Best Match';
const RECENT = 'Recent';
const feedTypes = [ BEST_MATCH,  RECENT ];
class FilterView extends Component {
  static propTypes = {
    loadCategories: React.PropTypes.func,
    categories: React.PropTypes.array,
    minPrice: React.PropTypes.number,
    maxPrice: React.PropTypes.number,
    type: React.PropTypes.string,
    category: React.PropTypes.object,
    filterFeed: React.PropTypes.func,
    clearFilter: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      filterStatusIcon: 'ios-arrow-forward'
    };
  }

  componentWillMount() {
    this.props.loadCategories();
  }

  filterByCategory(item) {
    this.props.filterFeed({category: item});
  }

  clearFilter() {
    this.props.clearFilter();
  }

  toggleFilter() {
    let filterStatusIcon = !this.state.isOpen ? "ios-arrow-down" : "ios-arrow-forward"
    this.setState({ isOpen: !this.state.isOpen, filterStatusIcon });
  }

  _handleCloseFilter() {
    this.setState({ isOpen: false });
  }

  _renderCategories() {
    const { category, categories } = this.props;
    return (
      <CategoryStrip
          categories={categories}
          selectedCategory={category}
          onCategorySelected={(cat) => this.filterByCategory(cat)}/>)
  }

  _rederFilterText() {
    if (this.props.category) {
      return (
          <Text style={myStyles.TextResults}>
            {this.props.category.name}
          </Text>
        );
    }

    return null;
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

  setFeedTypeSelectedOption(selectedFeedType){
    const type = selectedFeedType == BEST_MATCH ? 'relevant' : 'recent';
    this.props.filterFeed({type})
  }

  _renderFilters() {
    const selectedOption = this.props.type == 'relevant' ? BEST_MATCH : RECENT;
    return(
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
          {this._renderCategories()}
        </View>
        <RadioButtons
          options={ feedTypes }
          onSelection={ this.setFeedTypeSelectedOption.bind(this) }
          selectedOption={ selectedOption }
          renderOption={ this.renderRadioOption }
          renderContainer={ this.renderRadioContainer }
        />
      </View>
    )
  }

  render() {
    const labelColor = !_.isEmpty(this.props.category) ? '#1DE9B6' : '#212121';
    return(
      <View style={myStyles.container}>
        <View style={myStyles.filter}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button transparent onPress={() => this.toggleFilter()} style={myStyles.btnFilter}>
                <Icon name="md-options" style={[myStyles.normalBtn, { color: labelColor }]} />
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
                  <Icon name={this.state.filterStatusIcon} style={[myStyles.smallBtn]} />
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
