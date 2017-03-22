import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import FilterBar from './filters/FilterBar';
import SearchBar from './SearchBar';
import _ from 'lodash';

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFFFFF',
    //flex: 1,
  },
});

class SearchView extends Component {
  static propTypes = {
    onSearchBarLayout: React.PropTypes.func,
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string,
    onFilterBarLayout: React.PropTypes.func,
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
      <View style={{flex: 1}}>
        <SearchBar onLayout={e => this.props.onSearchBarLayout(e)}
                   handleSearchInput={(term) => this.props.handleSearchInput(term)} clearText={this.props.clearText}/>
        <FilterBar
          onLayout={e => this.props.onFilterBarLayout(e)}
          type={this.props.typeFilter}
          category={this.props.categoryFilter}
          filterFeed={this.props.filterFeed.bind(this)}
          clearFilter={this.props.clearFilter.bind(this)}
        />
      </View>
    )
  }
}

export default SearchView;

