import { POST_STATUS } from '../actionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case POST_STATUS:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
}
