import {combineReducers} from 'redux'; 
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
})

// Think of reducers as the "listeners"