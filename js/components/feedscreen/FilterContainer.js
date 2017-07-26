// @flow

import {connect} from 'react-redux';
import FiltersView from './FiltersView';
import {
  getBestMatchFeed,
  loadCategories,
} from '../../actions';


function mapDispatchToProps(dispatch, ownProps) {
  return {
    getFeed: query => dispatch(getBestMatchFeed(query)),
    loadCategories: (gender) => dispatch(loadCategories(gender)),
  };
}

const mapStateToProps = (state) => {
  let defaultFilters = {
    gender: '',
    body_type: ''
  };
  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      body_type: myBodyType,
    };
  }
  return {
    defaultFilters,
    meta: state.feed.bestMatch.meta,
    query: state.feed.bestMatch.query,
    filters: state.filters.categories
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);
