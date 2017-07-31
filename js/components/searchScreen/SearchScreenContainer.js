'use strict';

import {connect} from 'react-redux';
import {getBestMatchFeed} from '../../actions/feed';
import {addSearchTermHistoryToLooks, addSearchTermHistoryToPeople, getUsers} from '../../actions/search';
import asScreen from "../common/containers/Screen"
import SearchScreen from "./SearchScreen"

function bindAction(dispatch) {
  return {
    getFeed: query => dispatch(getBestMatchFeed(query)),
    addSearchTermHistoryToLooks: query => dispatch(addSearchTermHistoryToLooks(query)),
    addSearchTermHistoryToPeople: query => dispatch(addSearchTermHistoryToPeople(query)),
    getUsers: query => dispatch(getUsers(query)),
  };
}

const mapStateToProps = state => {
  return {
    likes: state.lookLikes.lookLikesData,
  }
};

export default asScreen(connect(mapStateToProps, bindAction)(asScreen(SearchScreen)));