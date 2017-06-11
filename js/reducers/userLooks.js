import { SET_USER_LOOKS_DATA, SET_USER_LOOKS } from '../actions/looks';
import * as _ from "lodash";
import * as userLookMapper from "../mappers/userLookMapper";

const initialState = {
  userLooksData: [],
  currId: -1,
  name: '',
  looksCount: -1,
  isMyProfile: true
};

export default function (state = initialState, action) {
  switch(action.type){
    case SET_USER_LOOKS:
      let userLooksData = action.payload.looks.map(userLookMapper.map);
      if(action.payload.currId === state.currId){
        userLooksData.unshift(...state.userLooksData)
      }
      return {
        ...state,
        userLooksData,
        currId: action.payload.currId,
        name: state.name,
        looksCount: state.looksCount,
        isMyProfile: state.isMyProfile,
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