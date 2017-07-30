// @flow

import {connect} from 'react-redux';
import FiltersView from './FiltersView';
import {
  toggleFiltersMenus,
  loadCategories,
  loadOccasionTags,
} from '../../actions/filters';

import {
  FEED_TYPE_BEST_MATCH,
  FEED_TYPE_FOLLOWING,
  FEED_TYPE_WHATS_HOT,
  getBestMatchFeed,
  getWhatsHotFeed,
  getFollowingFeed,
} from '../../actions/feed';

import {bodyTypesMapper} from '../../mappers/filterMapper';


function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  return {
    ...stateProps,
    getFeed: query => dispatch(getFeedActionSwitchByFeedType(ownProps.currentFeedTab)(query, ownProps.currentFeedTab)),
    loadCategories: () => dispatch(loadCategories(stateProps.gender)),
    loadOccasionTags: () => dispatch(loadOccasionTags(stateProps.gender)),
    toggleFiltersMenus: () => dispatch(toggleFiltersMenus(ownProps.currentFeedTab)),
  };
}

function mapStateToProps(state, ownProps) {
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = bodyTypesMapper(bodyTypes);
  const gender = state.user.gender;
  const filteredBodytypes = _.filter(bodyTypes, (bodyType) => bodyType.gender === gender)
  return {
    gender,
    defaultFilters: {...state.feed[ownProps.currentFeedTab].query, gender},
    filters: [state.filters.categories, state.filters.occasion_tags, filteredBodytypes],
  };
}

const getFeedActionSwitchByFeedType = (feedType) => {
  switch (feedType) {
    case FEED_TYPE_BEST_MATCH: {
      return getBestMatchFeed;
    }
    case FEED_TYPE_FOLLOWING: {
      return getFollowingFeed;
    }
    case FEED_TYPE_WHATS_HOT: {
      return getWhatsHotFeed;
    }
    default:
      return getBestMatchFeed;
  }
};

export default connect(mapStateToProps, null, mergeProps)(FiltersView);
