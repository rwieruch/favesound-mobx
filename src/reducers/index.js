import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import browse from './browse';
import entities from './entities';
import comment from './comment';

export default combineReducers({
  browse,
  entities,
  comment,
  routing: routerReducer
});
