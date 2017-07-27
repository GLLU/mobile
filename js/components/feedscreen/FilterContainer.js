// @flow

import {connect} from 'react-redux';
import FiltersView from './FiltersView';
import {
  getBestMatchFeed,
  getWhatsHotFeed,
  getFollowingFeed,
  loadCategories,
  loadOccasionTags,
  toggleFiltersMenues
} from '../../actions';
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../../actions/feed';


function mapDispatchToProps(dispatch, ownProps) {
  return {
    getFeed: query => dispatch(getFeedActionSwitchByFeedType(ownProps.currentFeedTab)(query, ownProps.currentFeedTab)),
    loadCategories: gender => dispatch(loadCategories(gender)),
    loadOccasionTags: gender => dispatch(loadOccasionTags(gender)),
    toggleFiltersMenues: feedType => dispatch(toggleFiltersMenues(ownProps.currentFeedTab)),
  };
}

const mapStateToProps = (state, ownProps) => {
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = mapBodyTypes(bodyTypes);
  const gender = state.user.gender;
  return {
    defaultFilters: {...state.feed[ownProps.currentFeedTab].query, gender},
    filters: [state.filters.categories, state.filters.occasion_tags, bodyTypes],
  };
};

const mapBodyTypes = bodytypes => _.chain(Object.keys(bodytypes))
  .map(key =>
    _.map(bodytypes[key], bodyType => ({
      id: bodyType.body_type,
      name: bodyType.name,
      gender: key,
      kind: 'body_type',
      icon: {
        url: bodyType.filterImageUrl,
        url_hover: bodyType.filterImageUrlActive,
      },
    })))
  .flatten()
  .value();

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

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);
