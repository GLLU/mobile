import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import RadioButtons from 'react-native-radio-buttons';
import { View, Text, Switch, TouchableWithoutFeedback, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import FilterGroup from './FilterGroup';
import BaseComponent from '../../common/BaseComponent';
import _ from 'lodash'

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  filter: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  filterActions: {
    backgroundColor: '#F5F5F5',
    height: 120,
    paddingHorizontal: 10
  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',
    height: 100
  }
});

const filters = [
  {
    key:'items',
    name: 'Items',
    icon: {
      url: require('../../../../images/filters/filter-categories.png'),
      url_hover: require('../../../../images/filters/filter-categories-active.png')
    },

  },
  {
    key:'gender',
    name: 'Gender',
    icon: {
      url: require('../../../../images/filters/filter-gender.png'),
      url_hover: require('../../../../images/filters/filter-gender-active.png')
    }
  },
  {
    key:'body',
    name: 'Body',
    icon: {
      url: require('../../../../images/filters/filter-body.png'),
      url_hover: require('../../../../images/filters/filter-body-active.png')
    }
  },
]

filters.forEach(filter=>{
  filter.filters=[filter,filter,filter,filter,filter]
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
    this._renderFilters=this._renderFilters.bind(this);
    this.state = {
      isOpen: false,
      filterStatusIcon: 'ios-arrow-forward',
      openFilter:'',
      filters:filters
    };
  }

  componentWillMount() {
    this.props.loadCategories();
  }

  filterByCategory(item) {
    const {category} = this.props;
    if (!category || item.id != category.id) {
      this.logEvent('Feedscreen', {name: 'Category select', category: item.name});
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
    this.setState({isOpen: !this.state.isOpen, filterStatusIcon});
  }

  _handleCloseFilter() {
    this.setState({isOpen: false});
  }

  handleToggleFilterPress() {
    this.logEvent('Feedscreen', {name: 'FilterBy click'});
    this.toggleFilter();
  }

  _renderSubFilters(filters) {
    return <FilterGroup filters={filters}/>;
  }

  _renderFilters(openFilter) {
    const currentFilter=_.find(this.state.filters,filter=>filter.name===openFilter);
    return (
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
          {this._renderSubFilters(currentFilter.filters)}
        </View>
      </View>
    )
  }

  _setFilters(filters){
    const openFilter = _.find(filters,filter=>filter.selected) || {name:''};
    this.setState({filters:filters, openFilter:openFilter.name})
  }

  render() {
    const labelColor = !_.isEmpty(this.props.category) ? '#1DE9B6' : '#212121';
    console.log(`this.state.openFilter: ${this.state.openFilter}`)
    return (
      <View style={myStyles.container}>
        <View style={myStyles.filter}>
          <FilterGroup onSelectionChange={this._setFilters.bind(this)} filters={this.state.filters}/>
        </View>
        {!_.isEmpty(this.state.openFilter) ? this._renderFilters(this.state.openFilter) : null}
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
