import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';
import { arrayOf, normalize } from 'normalizr';
import userSchema from '../../schemas/user';
import trackSchema from '../../schemas/track';
import * as trackTypes from '../../constants/trackTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { setPaginateLink } from '../../actions/paginate';
import { mergeEntities } from '../../actions/entities';
import { isTrack, toIdAndType } from '../../services/track';
import { getLazyLoadingUsersUrl } from '../../services/api';
import userStore from '../../stores/userStore';
import requestStore from '../../stores/requestStore';

export const fetchFollowings = (user, nextHref, ignoreInProgress) => (dispatch) => {
  const requestType = requestTypes.FOLLOWINGS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followings?limit=20&offset=0');

  if (requestStore.requests[requestType] && !ignoreInProgress) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(userSchema));
      dispatch(mergeEntities(normalized.entities));
      userStore.followings.push(normalized.result);
      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWINGS));
      requestStore.setRequestInProcess(requestType, false);
    });
};

export const fetchActivities = (user, nextHref) => (dispatch) => {
  const requestType = requestTypes.ACTIVITIES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'activities?limit=20&offset=0');

  if (requestStore.requests[requestType]) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const typeMap = flow(
        filter(isTrack),
        map(toIdAndType)
      )(data.collection);

      userStore.typeTracks = mergeTrackTypes(userStore.typeTracks, filter((value) => value.type === trackTypes.TRACK, typeMap));
      userStore.typeReposts = mergeTrackTypes(userStore.typeReposts, filter((value) => value.type === trackTypes.TRACK_REPOST, typeMap));

      const activitiesMap = flow(
        filter(isTrack),
        map('origin')
      )(data.collection);

      const normalized = normalize(activitiesMap, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
      userStore.activities.push(normalized.result);

      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES));
      requestStore.setRequestInProcess(requestType, false);
    });
};

export const fetchFollowers = (user, nextHref) => (dispatch) => {
  const requestType = requestTypes.FOLLOWERS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followers?limit=20&offset=0');

  if (requestStore.requests[requestType]) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(userSchema));
      dispatch(mergeEntities(normalized.entities));
      userStore.followers.push(normalized.result);
      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWERS));
      requestStore.setRequestInProcess(requestType, false);
    });
};

export const fetchFavorites = (user, nextHref) => (dispatch) => {
  const requestType = requestTypes.FAVORITES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=20&offset=0');

  if (requestStore.requests[requestType]) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
      userStore.favorites.push(normalized.result);
      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FAVORITES));
      requestStore.setRequestInProcess(requestType, false);
    });
};

const fetchFavoritesOfFollowing = (user, nextHref) => (dispatch) => {
  // const requestType = requestTypes.FAVORITES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=200&offset=0');

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
    });
};

const fetchFavoritesOfFollowings = () => (dispatch, getState) => {
  const { followings } = getState().user;

  if (followings) {
    map((following) => {
      if (!getState().followings[following.id]) {
        dispatch(fetchFavoritesOfFollowing());
      }
    }, followings);
  }
};

export const fetchAllFollowingsWithFavorites = () => (dispatch, getState) => {
  const nextHref = getState().paginate[paginateLinkTypes.FOLLOWINGS];
  const modifiedNextHref = nextHref ? nextHref.replace("page_size=20", "page_size=199") : null;
  const ignoreInProgress = true;

  const promise = dispatch(fetchFollowings(null, modifiedNextHref, ignoreInProgress));

  promise.then(() => {
    dispatch(fetchFavoritesOfFollowings());

    if (getState().paginate[paginateLinkTypes.FOLLOWINGS]) {
      dispatch(fetchAllFollowingsWithFavorites());
    }
  });
};

function mergeTrackTypes(previousList, incomingList) {
  const mergeTypes = reduce(countByType, previousList);
  return mergeTypes(incomingList);
}

function countByType(result, value) {
  /* eslint-disable no-param-reassign */
  result[value.id] = result[value.id] ? result[value.id] + 1 : 1;
  /* eslint-enable no-param-reassign */
  return result;
}
