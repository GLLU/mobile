'use strict';

import {connect} from 'react-redux';
import asScreen from "../common/containers/Screen"
import SearchTab from "./SearchTab"

const mapStateToProps = state => {
  console.log('state', state)
  return {
    results: state.search.people.data.users,
    searchHistory: state.search.people.history
  }
};

export default connect(mapStateToProps)(SearchTab);