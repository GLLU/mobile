import _ from 'lodash';
import { Image } from 'react-native';
import { SET_FLAT_LOOKS_FEED_DATA, RESET_FEED_DATA, SET_FLAT_LOOKS_FEED_DATA_QUEUE, CLEAR_FEED_DATA } from '../actions/feed';
import { LOOK_LIKE, LOOK_UNLIKE, SET_LOOK_LIKE_STATE } from '../actions/likes';
import { ADD_LOOK_COMMENT } from '../actions/comments';
import * as feedLookMapper from "../mappers/feedLookMapper";
import { REHYDRATE } from "redux-persist/constants";

const initialState = {
  flatLooksData: [],
  meta: {
    total: 0,
  },
  flatLooksDataQueue: [],
  query: {
    gender: null,
    body_type: null,
    category: null,
    term: '',
    page: {
      size: 10,
      number: 1
    }
  },
};

// Action Handlers
const ACTION_HANDLERS = {
  [LOOK_UNLIKE]: (state, action) => {
    const {lookId} = action;
    return {
      ...state,
      flatLooksData: _.map(state.flatLooksData||[],look => {

        if (look.id !== lookId) {
          return look;
        }
        else {
          const copy = _.cloneDeep(look);
          copy.liked = false;
          copy.likes--;
          return copy
        }
      })
    }
  },
  [LOOK_LIKE]: (state, action) => {
    const {lookId} = action;
    return {
      ...state,
      flatLooksData: _.map(state.flatLooksData||[],look => {

        if (look.id !== lookId) {
          return look;
        }
        else {
          const copy = _.cloneDeep(look);
          copy.liked = true;
          copy.likes++;
          return copy
        }
      })
    }
  },
  [ADD_LOOK_COMMENT]: (state, action) => {
    const {look_id} = action.payload;
    return {
      ...state,
      flatLooksData: _.map(state.flatLooksData||[],look => {
        if (look.id === look_id) {
          look.comments += 1;
        }
        return look;
      })
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {

    const meta = _.merge(state.meta, action.payload.data.meta);
    const query = action.payload.query;
    const currentLooksData = state.flatLooksData;
    const flatLooksDataLength = action.payload.loadMore ? state.flatLooksData.length : 0;
    const newData = action.payload.loadMore ?
      action.payload.data.looks :
      _.map(action.payload.data.looks || [], (look, index) => feedLookMapper.map(look, index, flatLooksDataLength));
    const flatLooksData = action.payload.loadMore ? currentLooksData.concat(newData) : newData;
    return {
      ...state,
      flatLooksData,
      meta,
      query,
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA_QUEUE]: (state, action) => {

    const meta = _.merge(state.meta, action.payload.data.meta);
    const query = action.payload.query;
    const flatLooksDataLength = action.payload.loadMore ? state.flatLooksData.length : 0;
    const newData = _.map(action.payload.data.looks||[],(look, index) => feedLookMapper.map(look, index, flatLooksDataLength));
    return {
      ...state,
      flatLooksDataQueue: newData,
      meta,
      query,
    }
  },
  [RESET_FEED_DATA]: (state, {payload}) => {
    const flatLooksData = _.map(payload.data.looks||[],look => feedLookMapper.map(look));
    return {
      ...state,
      flatLooksData,
      meta: payload.data.meta,
      query: payload.query
    }
  },
  [CLEAR_FEED_DATA]: () => {
    return {
      ...initialState,
    }
  },
  [REHYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload.user
    }
  },
}

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}