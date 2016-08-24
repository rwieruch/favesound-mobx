import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import { arrayOf, normalize } from 'normalizr';
import userSchema from '../../schemas/user';
import trackSchema from '../../schemas/track';
import * as trackTypes from '../../constants/trackTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { isTrack, toIdAndType } from '../../services/track';
import { getLazyLoadingUsersUrl } from '../../services/api';
import userStore from '../../stores/userStore';
import requestStore from '../../stores/requestStore';
import paginateStore from '../../stores/paginateStore';
import entityStore from '../../stores/entityStore';

export function fetchFollowings(user, nextHref, ignoreInProgress) {
  const requestType = requestTypes.FOLLOWINGS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followings?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType) && !ignoreInProgress) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(userSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFollowings(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FOLLOWINGS, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchActivities(user, nextHref) {
  const requestType = requestTypes.ACTIVITIES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'activities?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const typeMap = flow(
        filter(isTrack),
        map(toIdAndType)
      )(data.collection);

      userStore.mergeTypeTracks(filter((v) => v.type === trackTypes.TRACK, typeMap));
      userStore.mergeTypeReposts(filter((v) => v.type === trackTypes.TRACK_REPOST, typeMap));

      const activitiesMap = flow(
        filter(isTrack),
        map('origin')
      )(data.collection);

      const normalized = normalize(activitiesMap, arrayOf(trackSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeActivities(normalized.result);

      paginateStore.setPaginateLink(paginateLinkTypes.ACTIVITIES, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchFollowers(user, nextHref) {
  const requestType = requestTypes.FOLLOWERS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followers?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(userSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFollowers(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FOLLOWERS, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchFavorites(user, nextHref) {
  const requestType = requestTypes.FAVORITES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFavorites(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FAVORITES, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}
