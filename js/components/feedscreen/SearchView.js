import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import FilterBar from './filters/FilterBar';
import _ from 'lodash';

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});

class SearchView extends Component {
  static propTypes = {
    clearText: React.PropTypes.string,
    typeFilter: React.PropTypes.string,
    clearFilter: React.PropTypes.func,
    filterFeed: React.PropTypes.func

  };

  static defaultProps = {
    onSearchBarLayout: _.noop,
    clearText: '',
    onFilterBarLayout: _.noop,
    clearFilter: _.noop,
    filterFeed: _.noop
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={myStyles.container}>
        <FilterBar
          defaultFilters={this.props.defaultFilters}
          type={this.props.typeFilter}
          filterFeed={this.props.filterFeed}
          clearFilter={this.props.clearFilter}
          query={this.props.query}
        />
      </View>
    )
  }
}

export default SearchView;

