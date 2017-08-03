'use strict';

import {connect} from 'react-redux';
import {clearSearchHistory, getUsersSuggestions} from '../../actions/search';
import PeopleSearchTab from "./PeopleSearchTab"

function bindAction(dispatch) {
  return {
    clearSearchHistory: () => dispatch(clearSearchHistory('people')),
  };
}

const mapStateToProps = state => {
  return {
    results: state.search.people.data.users,
    searchHistory: state.search.people.history,
    suggestions: state.search.suggestions.users,
    isLoading: state.search.people.isLoading,
    canShowEmptyView: state.search.people.data.meta.currentPage !== 0
  }
};

export default connect(mapStateToProps, bindAction)(PeopleSearchTab);