// @flow

import {connect} from 'react-redux';
import FiltersView from './FiltersView';
import {
  getBestMatchFeed,
  loadCategories,
  loadOccasionTags
} from '../../actions';


function mapDispatchToProps(dispatch, ownProps) {
  return {
    getFeed: query => dispatch(getBestMatchFeed(query)),
    loadCategories: (gender) => dispatch(loadCategories(gender)),
    loadOccasionTags: (gender) => dispatch(loadOccasionTags(gender)),
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
  let bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  bodyTypes = mapBodyTypes(bodyTypes);

  return {
    defaultFilters,
    meta: state.feed.bestMatch.meta,
    query: state.feed.bestMatch.query,
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
