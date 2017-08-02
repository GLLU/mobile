// @flow

import rest from '../api/rest';
import UsersService from '../services/usersService';

// Actions
export const ADD_SEARCH_TERM = 'ADD_SEARCH_TERM';
export const SET_USERS = 'SET_USERS';
export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SET_SUGGESTIONS_USERS = 'SET_SUGGESTIONS_USERS';

export function addSearchTermToHistory(term, searchType) {
  return (dispatch, getState) => {
    const currentSearchHistory = _.cloneDeep(getState().search[searchType].history);
    if (_.find(currentSearchHistory, (value) => value === term)) {
      // if you find one, do nothing
    } else {
      if (currentSearchHistory.length > 3) {
        currentSearchHistory.pop();
      }
      currentSearchHistory.unshift(term)
      dispatch({
        type: ADD_SEARCH_TERM,
        searchData: {currentSearchHistory, searchType},
      });
    }
  };
}

export function clearSearchHistory(searchType: string) {
  console.log('searchType', searchType)
  return {
    type: CLEAR_SEARCH_HISTORY,
    searchType,
  };
}

export function clearSearchResults(searchType: string) {
  console.log('searchType', searchType)
  return {
    type: CLEAR_SEARCH_RESULTS,
    searchType,
  };
}

export function getUsers(term) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.id;
    const nextPage = 1;
    UsersService.getUsers(userId, nextPage, term).then((data) => {
      dispatch({
        type: SET_USERS,
        data: {
          users: data.users,
          meta: {
            currentPage: nextPage,
            total: data.meta.total
          },
        },

      });
    })
  };
}

export function getMoreUsers() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.id;
    const {meta} = state.blockedUsers;
    const nextPage = meta.currentPage + 1;
    UsersService.getUsers(userId, nextPage).then((data) => {
      const {blockedUsers} = getState().blockedUsers;
      const blockedUsersUnion = _.unionBy(blockedUsers, data.blockedUsers, user => user.id);
      dispatch({
        type: SET_BLOCKED_USERS,
        blockedUsers: blockedUsersUnion,
        meta: {
          currentPage: nextPage,
          total: data.meta.total
        }
      });
    })
  }
}

export function getUsersSuggestions() {
  return (dispatch) => {
    UsersService.getSuggestionsUsers().then((data) => {
      console.log('dataSuggestion:', data)
      dispatch({
        type: SET_SUGGESTIONS_USERS,
        users: data.users

      });
    })
  };
}

export function addSearchTermHistoryToLooks(term: string) {
  return addSearchTermToHistory(term, 'looks');
}

export function addSearchTermHistoryToPeople(term: string) {
  return addSearchTermToHistory(term, 'people');
}