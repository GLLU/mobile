// @flow

import rest from '../api/rest';
import UsersService from '../services/usersService';

// Actions
export const ADD_SEARCH_TERM = 'ADD_SEARCH_TERM';
export const SET_USERS = 'SET_USERS';

export function addSearchTermToHistory(term, searchType) {
  return (dispatch, getState) => {
    const currentSearchHistory = _.cloneDeep(getState().search[searchType].history);
    if (currentSearchHistory.length > 4) {
      currentSearchHistory.shift();
    }
    currentSearchHistory.push(term);
    dispatch({
      type: ADD_SEARCH_TERM,
      searchData: {currentSearchHistory, searchType},
    });
  };
}

export function getUsers(term) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.id;
    const nextPage = 1;
    UsersService.getUsers(userId, nextPage, term).then((data) => {
      const {users} = getState().search.people.data;
      const UsersUnion = _.unionBy(users, data.users, user => user.id);
      dispatch({
        type: SET_USERS,
        data: {
          users: UsersUnion,
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

export function addSearchTermHistoryToLooks(term: string) {
  return addSearchTermToHistory(term, 'looks');
}

export function addSearchTermHistoryToPeople(term: string) {
  return addSearchTermToHistory(term, 'people');
}