import * as actions from '../actions/follows';
import followMapper from '../mappers/followMapper'

const initialState = {
    userFollowsData: [],
    currId: -1
};

export default function (state:State = initialState, action): State {
    switch(action.type){
        case actions.SET_USER_FOLLOWS_DATA:
            let userFollowsData = action.payload.follows.map(followMapper.map);
            if(action.payload.currId === state.currId){
                userFollowsData.unshift(...state.userFollowsData)
            }
            return {
                ...state,
                userFollowsData,
                currId: action.payload.currId
            };
        case actions.INIT_USER_FOLLOWS:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
}