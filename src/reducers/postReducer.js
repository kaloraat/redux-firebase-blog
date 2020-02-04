import { FETCH_POSTS } from '../actionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload;
        default:
            return state;
    }
}
