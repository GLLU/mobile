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
    renderType: 'radio-multi'
  },
  {
    id: 'gender',
    name: 'Gender',
    icon: {
      url: require('../../../../images/filters/filter-gender.png'),
      url_hover: require('../../../../images/filters/filter-gender-active.png')
    },
    renderType: 'radio-single',
    filters: [
      {
        id: 'male',
        name: 'Male',
        kind: 'gender',
        icon: {
          url: require('../../../../images/filters/genders/filter-gender-male.png'),
          url_hover: require('../../../../images/filters/genders/filter-gender-male-active.png')
        }
      },
      {
        id: 'female',
        name: 'Female',
        kind: 'gender',
        icon: {
          url: require('../../../../images/filters/genders/filter-gender-female.png'),
          url_hover: require('../../../../images/filters/genders/filter-gender-female-active.png')
        }
      },
      {
        id: '',
        name: 'All',
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
    },
    renderType: 'radio-multi'
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
    filterFeed: React.PropTypes.func,
    clearFilter: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._renderFilters = this._renderFilters.bind(this);
    this.setInnerFilters = this.setInnerFilters.bind(this);
    this._filterFeed = this._filterFeed.bind(this);
    this.setDefaultSelections = this.setDefaultSelections.bind(this);
    this.state = {
      openFilter: {},
      filters: _.cloneDeep(filters),
      didSetDefaultFilters:false
    };
  }

  componentWillMount() {
    this.props.loadCategories();
  }

  componentWillReceiveProps(nextProps) {
    this.setInnerFilters('items', nextProps.categories);
    this.setInnerFilters('body_type', nextProps.bodyTypes);
    this.setDefaultSelections(this.state.filters, nextProps.defaultFilters, this.state.didConsumeDefaultValues)
  }

  setDefaultSelections(filters, defaultFilters) {

    if (!this.state.didSetDefaultFilters&&defaultFilters !== this.props.defaultFilters && defaultFilters !== undefined) {
      _.chain(Object.keys(defaultFilters))
        .map(index => {
          return {key: index, value: defaultFilters[index]}
        })
        .filter(kvp => !_.isEmpty(kvp.value))
        .each(kvp => {
          let mainFilter = _.find(filters, filter => filter.id === kvp.key);
          if (!_.isEmpty(mainFilter.filters)) {
            mainFilter.filters.forEach(subFilter => subFilter.selected = subFilter.id === kvp.value)
          }
        })
        .value();
      this._filterFeed(filters);
      this.setState({filters,didSetDefaultFilters:true})
    }
  }

  setInnerFilters(filterId, innerCategories) {
    if (innerCategories !== undefined) {
      let {filters} = this.state;
      filters = this.mapInnerFilters(filters, filterId, innerCategories);
      this.setState({filters});
    }
  }

  mapInnerFilters(filters, filterId, innerCategories) {
    let mainFilter = _.find(filters, filter => filter.id === filterId);
    if (_.isEmpty(mainFilter.filters)) {
      mainFilter.filters = innerCategories;
      const iteratee = (filter1, filter2) => filter1.id === filter2.id;
      filters = _.map(filters, filter => iteratee(filter, mainFilter) ? mainFilter : filter);
    }
    return filters;
  }

  _renderSubFilters(filters, openFilter) {
    switch (openFilter.renderType) {
      case 'radio-single':
        return <FilterGroup mode='single' onSelectionChange={(filters) => this._setSubFilters(openFilter, filters)}
                            filters={filters}/>;
      //case 'range':
      case 'radio-multi':
      default:
        return <FilterGroup onSelectionChange={(filters) => this._setSubFilters(openFilter, filters)}
                            filters={filters}/>;
    }
  }

  _renderFilters(openFilter) {
    const currentFilter = _.find(this.state.filters, filter => filter.id === openFilter.id);
    return (
      <View style={[myStyles.filterActions]}>
        <View style={myStyles.filterActionsGrid}>
          {this._renderSubFilters(currentFilter.filters, openFilter)}
        </View>
      </View>
    )
  }

  _filterFeed(filters) {
    const selections = _.chain(filters)
      .map(filter => filter.filters)
      .flatten()
      .filter(filter => filter.selected)
      .value();
    let query = {};
    selections.forEach(selection => query[selection.kind] = selection.id)
    this.props.filterFeed(query)
  }

  _setFilters(filters) {
    const openFilter = _.find(filters, filter => filter.selected) || {};
    this.setState({filters: filters, openFilter: openFilter})
  }

  _setSubFilters(openFilter, subFilters) {
    const filters = _.cloneDeep(this.state.filters);
    filters.forEach(filter => {
      if (filter.id === openFilter.id) {
        filter.filters = subFilters;
      }
    });
    this._filterFeed(filters);
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
  const categories = state.filters.categories ? state.filters.categories.map(category => {
    category.id = category.name;
    return category;
  }) : [];
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = mapBodyTypes(bodyTypes);
  let defaultFilters = {
    gender: '',
    body_type: ''
  };
  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      body_type: myBodyType
    };
  }
  return {
    categories: categories,
    bodyTypes: bodyTypes,
    defaultFilters: defaultFilters,
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
