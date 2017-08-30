'use strict';

import {connect} from 'react-redux';
import {clearSearchHistory} from '../../actions/search';
import PeopleSearchTab from "./PeopleSearchTab"

function bindAction(dispatch) {
  return {
    clearSearchHistory: () => dispatch(clearSearchHistory('people')),
  };
}

const mapStateToProps = state => {

  const suggestedUsersObjects = _.map(state.search.suggestions.users, (userId) => state.users.usersData[userId])
  return {
    results: state.search.people.data.users,
    searchHistory: state.search.people.history,
    suggestions: suggestedUsersObjects,
    isLoading: state.search.people.isLoading,
    canShowEmptyView: state.search.people.data.meta.currentPage !== 0
  }
};

export default connect(mapStateToProps, bindAction)(PeopleSearchTab);