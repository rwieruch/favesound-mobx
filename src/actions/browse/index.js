import { arrayOf, normalize } from 'normalizr';
import trackSchema from '../../schemas/track';
import * as actionTypes from '../../constants/actionTypes';
import * as requestTypes from '../../constants/requestTypes';
import { unauthApiUrl } from '../../services/api';
import { mergeEntities } from '../../actions/entities';
import requestStore from '../../stores/requestStore';
import paginateStore from '../../stores/paginateStore';

function mergeActivitiesByGenre(activities, genre) {
  return {
    type: actionTypes.MERGE_GENRE_ACTIVITIES,
    activities,
    genre
  };
}

export const fetchActivitiesByGenre = (nextHref, genre) => (dispatch) => {
  const requestType = requestTypes.GENRES;
  const initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
  const url = nextHref || initHref;

  if (requestStore.requests[requestType]) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
      dispatch(mergeActivitiesByGenre(normalized.result, genre));
      paginateStore.setPaginateLink(genre, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
};
