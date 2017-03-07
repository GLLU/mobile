import { SET_USER_FOLLOWERS_DATA } from '../actions/followers';

const initialState = {
    userFollowersData: [],
    currId: -1
};

export default function (state:State = initialState, action): State {
    switch(action.type){
        case SET_USER_FOLLOWERS_DATA:
            let userFollowersData = action.payload.followers.map(flattenFollowData);
            if(action.payload.currId === state.currId){
                userFollowersData.push(...state.userFollowersData)
            }
            return {
                ...state,
                userFollowersData,
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
        about_me: follow.user.about_me,
        is_following: follow.user.is_following,
        is_follower: follow.user.is_follower
    };
}