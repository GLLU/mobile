import {
  FINISH_FETCHING_BEST_MATCH_SUGGESTIONS, SET_BEST_MATCH_SUGGESTIONS,
  START_FETCHING_BEST_MATCH_SUGGESTIONS,
} from '../actions/bestMatchSuggestions';


const initialState = {
  suggestions: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BEST_MATCH_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
      };
    case START_FETCHING_BEST_MATCH_SUGGESTIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FINISH_FETCHING_BEST_MATCH_SUGGESTIONS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
