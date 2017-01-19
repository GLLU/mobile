import type { Action } from '../actions/types';
import rest from '../api/rest';

import { readEndpoint, setHeaders } from 'redux-json-api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export default function getFeed(feedType):Action {
    return (dispatch) => {
        return dispatch(readEndpoint(`feed?type[`+feedType+`]`)).then((feedType) => {
            console.log('feeds data', feedType);
        });
    };
}

