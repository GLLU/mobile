'use strict';

import {connect} from 'react-redux';
import {getBestMatchFeed} from '../../actions/feed';
import {addSearchTermHistoryToLooks, addSearchTermHistoryToPeople, getUsers} from '../../actions/search';
import asScreen from "../common/containers/Screen"
import SearchTab from "./SearchTab"

const mapStateToProps = state => {
  return {
    results: [],
    searchHistory: state.search.looks.history
  }
};

export default connect(mapStateToProps)(SearchTab);