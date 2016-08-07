import { arrayOf, normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import * as actionTypes from '../../constants/actionTypes';
import { mergeEntities } from '../../actions/entities';
import { setPaginateLink } from '../../actions/paginate';
import { getLazyLoadingCommentsUrl } from '../../services/api';
import { getCommentProperty } from '../../services/string';
import requestStore from '../../stores/requestStore';

function setOpenComments(trackId) {
  return {
    type: actionTypes.OPEN_COMMENTS,
    trackId
  };
}

function mergeComments(comments, trackId) {
  return {
    type: actionTypes.MERGE_COMMENTS,
    comments,
    trackId
  };
}

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
      dispatch(mergeComments(normalized.result, trackId));
      dispatch(setPaginateLink(data.next_href, requestProperty));
      requestStore.setRequestInProcess(requestProperty, false);
    });
};

export const openComments = (trackId) => (dispatch, getState) => {
  const comments = getState().comment.comments[trackId];

  dispatch(setOpenComments(trackId));

  if (!comments) {
    dispatch(fetchComments(trackId));
  }
};
