import rest from '../api/rest';

// Actions
export const SET_USER_FOLLOW_STATE = 'SET_USER_FOLLOW_STATE';
export const GET_USER_FOLLOWS = 'GET_USER_FOLLOWS';

export function followUpdate(data) {
    return (dispatch) => {
        dispatch({
            type: SET_USER_FOLLOW_STATE,
            payload: data
        });
        dispatch(follow(data.id));
    };
}

export function unFollowUpdate(data) {
    return (dispatch) => {
        dispatch({
            type: SET_USER_FOLLOW_STATE,
            payload: data
        });
        dispatch(unfollow(data.id));
    };
}

export function follow(id) {
    return (dispatch, getState) => {
        dispatch(rest.actions.follows.post({user_id: id}, {}, (err, data) => {
            if (!err) {
            }
        }));
    };
}

export function unfollow(id) {
    return (dispatch) => {
        dispatch(rest.actions.follows.delete({user_id: id}, (err, data) => {
            if (!err) {
            }
        }));
    };
}

