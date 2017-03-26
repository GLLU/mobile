import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import FilterBar from './filters/FilterBar';
import SearchBar from './SearchBar';
import _ from 'lodash';

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});

class SearchView extends Component {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string,
    typeFilter: React.PropTypes.string,
    categoryFilter: React.PropTypes.string,
    clearFilter: React.PropTypes.func,
    filterFeed: React.PropTypes.func

  };

  static defaultProps = {
    onSearchBarLayout: _.noop,
    handleSearchInput: _.noop,
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
        <SearchBar
          handleSearchInput={(term) => this.props.handleSearchInput(term)}
          clearText={this.props.clearText}/>
        <FilterBar
          type={this.props.typeFilter}
          category={this.props.categoryFilter}
          filterFeed={this.props.filterFeed}
          clearFilter={this.props.clearFilter}
        />
      </View>
    )
  }
}

export default SearchView;

