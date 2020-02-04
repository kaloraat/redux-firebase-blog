import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import postReducer from './postReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    // form: formReducer,
    posts: postReducer,
    user: userReducer,
    loading: loadingReducer
});

export default rootReducer;
