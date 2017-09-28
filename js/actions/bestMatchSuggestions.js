import BestMatchSuggestionsService from '../services/bestMatchSuggestionsService';
import * as _ from 'lodash';

export const SET_BEST_MATCH_SUGGESTIONS = 'SET_BEST_MATCH_SUGGESTIONS';
export const START_FETCHING_BEST_MATCH_SUGGESTIONS = 'START_FETCHING_BEST_MATCH_SUGGESTIONS';
export const FINISH_FETCHING_BEST_MATCH_SUGGESTIONS = 'FINISH_FETCHING_BEST_MATCH_SUGGESTIONS';

export function getSuggestions() {
  return (dispatch) => {
    dispatch(startFetching());
    BestMatchSuggestionsService.getSuggestions().then((suggestions) => {
      dispatch(setSuggestions(suggestions));
      dispatch(finishFetching());
    });
  };
}

export function setSuggestions(suggestions) {
  return (dispatch) => {
    dispatch({
      type: SET_BEST_MATCH_SUGGESTIONS,
      suggestions,
    });
  };
}

export function startFetching() {
  return {
    type: START_FETCHING_BEST_MATCH_SUGGESTIONS,
  };
}

export function finishFetching(isEndReached: boolean) {
  return {
    type: FINISH_FETCHING_BEST_MATCH_SUGGESTIONS,
  };
}
