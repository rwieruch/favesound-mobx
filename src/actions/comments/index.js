import { arrayOf, normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import { getLazyLoadingCommentsUrl } from '../../services/api';
import { getCommentProperty } from '../../services/string';
import requestStore from '../../stores/requestStore';
import paginateStore from '../../stores/paginateStore';
import commentStore from '../../stores/commentStore';
import entityStore from '../../stores/entityStore';

export function fetchComments(trackId, nextHref) {
  const requestProperty = getCommentProperty(trackId);
  const initUrl = 'tracks/' + trackId + '/comments?linked_partitioning=1&limit=20&offset=0';
  const url = getLazyLoadingCommentsUrl(nextHref, initUrl);

  if (requestStore.getRequestByType(requestProperty)) { return; }

  requestStore.setRequestInProcess(requestProperty, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(commentSchema));
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      entityStore.mergeEntities('comments', normalized.entities.comments);
      commentStore.mergeComments(trackId, normalized.result);
      paginateStore.setPaginateLink(requestProperty, data.next_href);
      requestStore.setRequestInProcess(requestProperty, false);
    });
}

export function openComments(trackId) {
  const comments = commentStore.comments.get(trackId);
  commentStore.setOpenComments(trackId, comments);

  if (!comments) {
    fetchComments(trackId);
  }
}
