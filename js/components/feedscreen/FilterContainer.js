// @flow

import { connect } from 'react-redux';
import FiltersView from './FiltersView';
import {
  loadCategories,
  loadOccasionTags,
} from '../../actions/filters';

import { BODY_SHAPES, CATEGORIES, EVENTS } from '../../reducers/filters';

import { bodyTypesMapper } from '../../mappers/filterMapper';

const serializeFilter = (title: string, filters: Array<object>, gender: string = '') => {
  const filter = _.first(filters);
  const kind = filter ? filter.kind : '';
  const genderFilters = gender ? _.filter(filters, (filter) => filter.gender === gender) :
    _.unionBy(filters, (filter) => filter.name);
  return {
    title,
    kind,
    filters: genderFilters
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadOccasionTags: () => dispatch(loadOccasionTags()),
  };
}

function mapStateToProps(state, ownProps) {
  const bodyTypes = state.myBodyType.bodyTypes ? state.myBodyType.bodyTypes : [];
  const mappedBodyTypes = bodyTypesMapper(bodyTypes);
  const gender = ownProps.filtersGender;
  const { showFilters = [CATEGORIES, EVENTS, BODY_SHAPES] } = ownProps;
  const filtersArray = [
    serializeFilter(CATEGORIES, state.filters.categories, gender),
    serializeFilter(EVENTS, state.filters.occasion_tags, gender),
    serializeFilter(BODY_SHAPES, mappedBodyTypes, gender)
  ];
  const filters = _.map(showFilters, showFilter => _.find(filtersArray, filter => filter.title === showFilter));
  return {
    gender,
    filters,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersView);
