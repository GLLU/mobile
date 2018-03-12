import BestMatchSuggestionsService from '../services/querySuggestionsService';
import * as _ from 'lodash';

export const SET_QUERY_SUGGESTIONS = 'SET_QUERY_SUGGESTIONS';
export const START_FETCHING_QUERY_SUGGESTIONS = 'START_FETCHING_QUERY_SUGGESTIONS';

export function getSuggestions() {
  return (dispatch) => {
    dispatch(startFetching());
    BestMatchSuggestionsService.getSuggestions().then((suggestions) => {
      dispatch(setSuggestions(suggestions));
    });
  };
}

export function setSuggestions(suggestions) {
  return (dispatch) => {
    dispatch({
      type: SET_QUERY_SUGGESTIONS,
      suggestions,
    });
  };
}

export function startFetching() {
  return {
    type: START_FETCHING_QUERY_SUGGESTIONS,
  };
}
