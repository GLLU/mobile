'use strict';

import {connect} from 'react-redux';
import {getWhatsHotFeed} from '../../actions/feed';
import {
  addSearchTermHistoryToLooks,
  addSearchTermHistoryToPeople,
  getUsers,
  clearPeopleSearchResults,
  getUsersSuggestions
} from '../../actions/search';
import asScreen from "../common/containers/Screen"
import SearchScreen from "./SearchScreen"

function bindAction(dispatch) {
  return {
    getFeed: query => dispatch(getWhatsHotFeed(query)),
    addSearchTermHistoryToLooks: query => dispatch(addSearchTermHistoryToLooks(query)),
    addSearchTermHistoryToPeople: query => dispatch(addSearchTermHistoryToPeople(query)),
    clearPeopleSearchResults: query => dispatch(clearPeopleSearchResults(query)),
    getUsers: query => dispatch(getUsers(query)),
    getUsersSuggestions: () => dispatch(getUsersSuggestions()),
  };
}

const mapStateToProps = state => {
  return {
    peopleSearchResults: state.search.people.data.users,
  }
};

export default asScreen(connect(mapStateToProps, bindAction)(asScreen(SearchScreen)));