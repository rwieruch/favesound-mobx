import { arrayOf, normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import { mergeEntities } from '../../actions/entities';
import { getLazyLoadingCommentsUrl } from '../../services/api';
import { getCommentProperty } from '../../services/string';
import requestStore from '../../stores/requestStore';
import paginateStore from '../../stores/paginateStore';
import commentStore from '../../stores/commentStore';

export const fetchComments = (trackId, nextHref) => (dispatch) => {
  const requestProperty = getCommentProperty(trackId);
  const initUrl = 'tracks/' + trackId + '/comments?linked_partitioning=1&limit=20&offset=0';
  const url = getLazyLoadingCommentsUrl(nextHref, initUrl);

  if (requestStore.requests[requestProperty]) { return; }

  requestStore.setRequestInProcess(requestProperty, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(commentSchema));
      dispatch(mergeEntities(normalized.entities));
      commentStore.mergeComments(trackId, normalized.result);
      paginateStore.setPaginateLink(requestProperty, data.next_href);
      requestStore.setRequestInProcess(requestProperty, false);
    });
};

export const openComments = (trackId) => (dispatch, getState) => {
  const comments = getState().comment.comments[trackId];

  commentStore.setOpenComments(trackId);

  if (!comments) {
    dispatch(fetchComments(trackId));
  }
};
