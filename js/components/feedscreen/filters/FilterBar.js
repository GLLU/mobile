import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import RadioButtons from 'react-native-radio-buttons';
import {View, Text, Switch, TouchableWithoutFeedback, TouchableHighlight, Dimensions, StyleSheet} from 'react-native';
import SearchBar from '../SearchBar';
import BaseComponent from '../../common/BaseComponent';

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

class FilterView extends BaseComponent {
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
    const { category } = this.props;
    if (!category || item.id != category.id) {
      this.logEvent('Feedscreen', { name: 'Category select', category: item.name });
      this.props.filterFeed({category: item});
    } else {
      this.props.filterFeed({category: null});
    }
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

  handleToggleFilterPress() {
    this.logEvent('Feedscreen', { name: 'FilterBy click' });
    this.toggleFilter();
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

  _renderFilters() {
    return(
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
          {this._renderCategories()}
        </View>
      </View>
    )
  }

  render() {
    const labelColor = !_.isEmpty(this.props.category) ? '#1DE9B6' : '#212121';
    return(
      <View style={myStyles.container}>
        <View style={myStyles.filter}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button transparent onPress={this.handleToggleFilterPress.bind(this)} style={myStyles.btnFilter}>
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
