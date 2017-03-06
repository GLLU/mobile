import rest from '../api/rest';

// Actions
export const SET_USER_FOLLOWERS_DATA= 'SET_USER_FOLLOWERS_DATA';

export function setUserFollowersData(data):Action {
    return {
        type: SET_USER_FOLLOWERS_DATA,
        payload: data
    };
}

export function getUserFollowersData(id,pageNumber=1,pageSize=25):Action {
    return (dispatch) => {
        return dispatch(rest.actions.followers({id: id, "page[size]" : pageSize, "page[number]" : pageNumber}, {}, (err, userFollowersData) => {
            if (!err && userFollowersData) {
                let followersData = {
                    currId: id,
                    followers: userFollowersData.follows
                };
                dispatch(setUserFollowersData(followersData));
            }
        }));
    };
}

