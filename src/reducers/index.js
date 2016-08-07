import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import browse from './browse';
import entities from './entities';

export default combineReducers({
  browse,
  entities,
  routing: routerReducer
});
