import { orderBy } from 'lodash';
import * as sortTypes from '../constants/sortTypes';

const SORT_NAMES = {
  [sortTypes.NONE]: 'NONE',
  [sortTypes.SORT_PLAYS]: 'PLAYS',
  [sortTypes.SORT_FAVORITES]: 'FAVORITES',
  [sortTypes.SORT_REPOSTS]: 'REPOSTS',
  [sortTypes.SORT_COMMENTS]: 'COMMENTS',
  [sortTypes.SORT_DOWNLOADS]: 'DOWNLOADS',
};

const SORT_FUNCTIONS = {
  [sortTypes.NONE]: (objs) => objs,
  [sortTypes.SORT_PLAYS]: sortByPlays,
  [sortTypes.SORT_FAVORITES]: sortByFavorites,
  [sortTypes.SORT_REPOSTS]: sortByReposts,
  [sortTypes.SORT_COMMENTS]: sortByComments,
  [sortTypes.SORT_DOWNLOADS]: sortByDownloads,
};

function sortByPlays(activities) {
  return orderBy(activities, (activity) => activity.playback_count, 'desc');
}

function sortByFavorites(activities) {
  return orderBy(activities, (activity) => activity.likes_count, 'desc');
}

function sortByReposts(activities) {
  return orderBy(activities, (activity) => activity.reposts_count, 'desc');
}

function sortByComments(activities) {
  return orderBy(activities, (activity) => activity.comment_count, 'desc');
}

function sortByDownloads(activities) {
  return orderBy(activities, (activity) => activity.download_count, 'desc');
}

export {
  SORT_NAMES,
  SORT_FUNCTIONS,
};
