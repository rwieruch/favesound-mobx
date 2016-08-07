import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import player from './player';
import browse from './browse';
import entities from './entities';
import comment from './comment';

export default combineReducers({
  player,
  browse,
  entities,
  comment,
  routing: routerReducer
});
