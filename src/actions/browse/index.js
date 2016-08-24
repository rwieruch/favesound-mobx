import { arrayOf, normalize } from 'normalizr';
import trackSchema from '../../schemas/track';
import * as requestTypes from '../../constants/requestTypes';
import { unauthApiUrl } from '../../services/api';
import requestStore from '../../stores/requestStore';
import paginateStore from '../../stores/paginateStore';
import entityStore from '../../stores/entityStore';
import browseStore from '../../stores/browseStore';

export function fetchActivitiesByGenre(nextHref, genre) {
  const requestType = requestTypes.GENRES;
  const initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
  const url = nextHref || initHref;

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(trackSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      browseStore.mergeActivitiesByGenre(genre, normalized.result);
      paginateStore.setPaginateLink(genre, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}
