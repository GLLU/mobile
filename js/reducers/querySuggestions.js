import {
  SET_QUERY_SUGGESTIONS,
  START_FETCHING_QUERY_SUGGESTIONS,
} from '../actions/querySuggestions';


const initialState = {
  suggestions: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUERY_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false,
      };
    case START_FETCHING_QUERY_SUGGESTIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}
