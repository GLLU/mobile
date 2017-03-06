import { SET_USER_FOLLOWS_DATA } from '../actions/follows';

const initialState = {
    userFollowsData: [],
    currId: -1
};

export default function (state:State = initialState, action): State {
    switch(action.type){
        case SET_USER_FOLLOWS_DATA:
            let userFollowsData = action.payload.follows.map(flattenFollowData);
            if(action.payload.currId === state.currId){
                userFollowsData.unshift(...state.userFollowsData)
            }
            return {
                ...state,
                userFollowsData,
                currId: action.payload.currId
            };
        default:
            return state
    }
}

function flattenFollowData(follow){
    return {
        id: follow.id,
        user_id: follow.user_id,
        avatar: follow.user.avatar,
        name: follow.user.name,
        username: follow.user.username,
        about_me: follow.user.about_me
    };
}