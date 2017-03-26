import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    id: 'items',
    name: 'Items',
    icon: {
      url: require('../../../../images/filters/filter-categories.png'),
      url_hover: require('../../../../images/filters/filter-categories-active.png')
    },

  },
  {
    id: 'gender',
    name: 'Gender',
    icon: {
      url: require('../../../../images/filters/filter-gender.png'),
      url_hover: require('../../../../images/filters/filter-gender-active.png')
    },
    filters: [
      {
        id: 'male',
        name: 'Male',
        kind: 'gender',
        icon: {
          url: require('../../../../images/filters/filter-gender.png'),
          url_hover: require('../../../../images/filters/filter-gender-active.png')
        }
      },
      {
        id: 'female',
        name: 'Female',
        kind: 'gender',
        icon: {
          url: require('../../../../images/filters/filter-gender.png'),
          url_hover: require('../../../../images/filters/filter-gender-active.png')
        }
      }
    ]
  },
  {
    id: 'body_type',
    name: 'Body',
    icon: {
      url: require('../../../../images/filters/filter-body.png'),
      url_hover: require('../../../../images/filters/filter-body-active.png')
    }
  },
];

// filters.forEach((filter, i) => {
//   filter.filters = _.map(_.times((i + 1) * 4), iteration => {
//     const x=_.cloneDeep(filter);
//     x.id=iteration;
//     return x;
//   })
// });

import { loadCategories } from '../../../actions/filters';

class FilterBar extends BaseComponent {
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
    this._renderFilters = this._renderFilters.bind(this);
    this.setInnerFilters= this.setInnerFilters.bind(this);
    this.state = {
      isOpen: false,
      filterStatusIcon: 'ios-arrow-forward',
      openFilter: '',
      filters: filters
    };
  }

  componentWillMount() {
    this.props.loadCategories();
  }

  componentWillReceiveProps(nextProps) {
    this.setInnerFilters('items',nextProps.categories);
    this.setInnerFilters('body_type',nextProps.bodyTypes);
  }

  setInnerFilters(filterId, innerCategories){
    if(innerCategories!==undefined){
      let {filters} = this.state;
      filters = this.mapInnerFilters(filters, filterId, innerCategories);
      this.setState({filters});
    }
  }

  mapInnerFilters(filters, filterId,innerCategories) {
    let mainFilter = _.find(filters, filter => filter.id === filterId);
    mainFilter.filters = innerCategories;
    const iteratee = (filter1, filter2) => filter1.id === filter2.id;
    filters = _.map(filters, filter => iteratee(filter, mainFilter) ? mainFilter : filter);
    return filters;
  }

  _renderSubFilters(filters, openFilter) {
    return <FilterGroup onSelectionChange={(filters) => this._setSubFilters(openFilter, filters)} filters={filters}/>;
  }

  _renderFilters(openFilter) {
    const currentFilter = _.find(this.state.filters, filter => filter.id === openFilter);
    return (
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
          {this._renderSubFilters(currentFilter.filters, openFilter)}
        </View>
      </View>
    )
  }

  _setFilters(filters) {
    const openFilter = _.find(filters, filter => filter.selected) || {id: 0};
    this.setState({filters: filters, openFilter: openFilter.id})
  }

  _setSubFilters(openFilter, subFilters) {
    const filters = _.cloneDeep(this.state.filters);
    filters.forEach(filter => {
      if (filter.id === openFilter) {
        filter.filters = subFilters;
      }
    });
    this._setFilters(filters);
  }

  render() {
    const activeFilter = {
      color: '#757575',
      underline: true
    };
    return (
      <View style={myStyles.container}>
        <View style={myStyles.filter}>
          <FilterGroup mode='single' activeStyle={activeFilter} onSelectionChange={this._setFilters.bind(this)}
                       filters={this.state.filters}/>
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
  const categories = state.filters.categories ? state.filters.categories : [];
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = mapBodyTypes(bodyTypes);
  return {
    categories: categories,
    bodyTypes: bodyTypes,
    minPrice: state.filters.minPrice,
    maxPrice: state.filters.maxPrice
  }
};

const mapBodyTypes = (bodytypes) => {
  return _.chain(Object.keys(bodytypes))
    .map(key =>
      _.map(bodytypes[key], bodyType => {
        return {
          id: bodyType.body_type,
          name: bodyType.name,
          gender: key,
          kind: 'body_type',
          icon: {
            url: bodyType.imageOriUrl,
            url_hover: bodyType.imageOriUrl,
          }
        };
      }))
    .flatten()
    .value();
}

export default connect(mapStateToProps, bindActions)(FilterBar);
