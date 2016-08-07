import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import browse from './browse';

export default combineReducers({
  browse,
  routing: routerReducer
});
