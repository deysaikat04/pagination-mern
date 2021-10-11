import cityReducer from './cityReducer';
import userReducer from './userReducer';
import uploadReducer from './uploadReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    city: cityReducer,
    user: userReducer,
    file: uploadReducer,
})
