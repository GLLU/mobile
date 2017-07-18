import { SET_USER_LOOKS_DATA, SET_USER_LOOKS, SET_USER_LOOKS_FEED_DATA_QUEUE } from '../actions/looks';
import * as _ from "lodash";
import * as feedLookMapper from "../mappers/feedLookMapper";

const initialState = {
  userLooksData: [],
  userLooksDataQueue: [],
  currId: -1,
  meta: {
    total_count: 0,
  },
  query: {
    page: {
      size: 10,
      number: 1
    }
  },
};

export default function (state = initialState, action) {
  let meta;
  let query;
  let currentLooksData;
  let userLooksDataLength;
  let newData;

  switch(action.type){
    case SET_USER_LOOKS:
      meta = _.merge(state.meta, action.payload.data.meta);
      query = action.payload.query;
      currentLooksData = state.userLooksData;
      userLooksDataLength = action.payload.loadMore ? state.userLooksData.length : 0;
      newData = action.payload.loadMore ?
        action.payload.data.looks :
        _.map(action.payload.data.looks || [], (look, index) => feedLookMapper.map(look, index, userLooksDataLength));
      const userLooksData = action.payload.loadMore ? currentLooksData.concat(newData) : newData;
      return {
        ...state,
        userLooksData,
        meta,
        query,
        currId:  action.payload.loadMore ? state.currId : action.payload.data.currId
      };
    case SET_USER_LOOKS_FEED_DATA_QUEUE:
      meta = _.merge(state.meta, action.payload.data.meta);
      query = action.payload.query;
      userLooksDataLength = action.payload.loadMore ? state.userLooksData.length : 0;
      newData = _.map(action.payload.data.looks||[],(look, index) => feedLookMapper.map(look, index, userLooksDataLength));
      return {
        ...state,
        userLooksDataQueue: newData,
        meta,
        query,
        currId: action.payload.loadMore ? state.currId : action.payload.data.currId
      };

    case SET_USER_LOOKS_DATA:
      return {
        ...state,
        name: action.payload.name,
        looksCount: action.payload.looksCount,
        isMyProfile: action.payload.isMyProfile,
      };
    default:
      return state
  }
}