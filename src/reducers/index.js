import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import player from './player';
import browse from './browse';
import request from './request';
import paginate from './paginate';
import entities from './entities';
import toggle from './toggle';
import comment from './comment';
import filter from './filter';
import sort from './sort';

export default combineReducers({
  player,
  browse,
  request,
  paginate,
  entities,
  toggle,
  comment,
  filter,
  sort,
  routing: routerReducer
});
