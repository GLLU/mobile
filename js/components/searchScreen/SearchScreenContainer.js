'use strict';

import {connect} from 'react-redux';
import {getWhatsHotFeed} from '../../actions/feed';
import {
  addSearchTermHistoryToLooks,
  addSearchTermHistoryToPeople,
  getUsers,
  clearSearchResults
} from '../../actions/search';
import asScreen from "../common/containers/Screen"
import SearchScreen from "./SearchScreen"

function bindAction(dispatch) {
  return {
    getFeed: query => dispatch(getWhatsHotFeed(query)),
    addSearchTermHistoryToLooks: query => dispatch(addSearchTermHistoryToLooks(query)),
    addSearchTermHistoryToPeople: query => dispatch(addSearchTermHistoryToPeople(query)),
    clearSearchResults: query => dispatch(clearSearchResults(query)),
    getUsers: query => dispatch(getUsers(query)),
  };
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    peopleSearchResults: state.search.people.data.users,
  }
};

export default asScreen(connect(mapStateToProps, bindAction)(asScreen(SearchScreen)));