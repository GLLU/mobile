// @flow

import {connect} from 'react-redux';
import FiltersView from './FiltersView';
import {
  getBestMatchFeed,
  loadCategories,
  loadOccasionTags,
} from '../../actions';


function mapDispatchToProps(dispatch, ownProps) {
  return {
    getFeed: query => dispatch(getBestMatchFeed(query)),
    loadCategories: (gender) => dispatch(loadCategories(gender)),
    loadOccasionTags: (gender) => dispatch(loadOccasionTags(gender)),
  };
}

const mapStateToProps = (state, ownProps) => {
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = mapBodyTypes(bodyTypes);
  const gender = state.user.gender
  return {
    defaultFilters: {...state.feed[ownProps.currentFeedTab].query, gender},
    filters: [state.filters.categories, state.filters.occasion_tags, bodyTypes],
  };
};

const mapBodyTypes = (bodytypes) => {
  return _.chain(Object.keys(bodytypes))
    .map(key =>
      _.map(bodytypes[key], bodyType => {
        return {
          id: bodyType.body_type,
          name: bodyType.name,
          gender: key,
          kind: 'body_type',
          icon: {
            url: bodyType.filterImageUrl,
            url_hover: bodyType.filterImageUrlActive,
          }
        };
      }))
    .flatten()
    .value();
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);
