'use strict';

import {connect} from 'react-redux';
import {getBestMatchFeed} from '../../actions/feed';
import {clearSearchHistory} from '../../actions/search';
import LooksSearchTab from "./LooksSearchTab"

function bindAction(dispatch) {
  return {
    clearSearchHistory: () => dispatch(clearSearchHistory('looks')),
  };
}

const mapStateToProps = state => {
  return {
    searchHistory: state.search.looks.history
  }
};

export default connect(mapStateToProps, bindAction)(LooksSearchTab);