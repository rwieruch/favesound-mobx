import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import * as actions from '../../actions/index';
import { getCommentProperty } from '../../services/string';
import ButtonMore from '../../components/ButtonMore';
import Artwork from '../../components/Artwork';
import { fromNow } from '../../services/track';

function CommentExtension({
  activity,
  commentIds,
  commentEntities,
  userEntities,
  requestInProcess,
  nextHref,
  onFetchComments
}) {
  const moreButtonProps = {
    onClick: () => onFetchComments(activity.id, nextHref),
    requestInProcess: requestInProcess || !commentIds,
    nextHref,
  };

  return (
    <div className="comment-extension">
      {map((commentId, key) => {
        const comment = commentEntities[commentId];
        const user = userEntities[comment.user];
        return (
          <div key={key} className="comment-extension-item">
            <Artwork image={user.avatar_url} title={user.username} size={40} />
            <div className="comment-extension-item-body">
              <div className="comment-extension-item-body-header">
                <span>{user.username}</span>
                <span>{fromNow(comment.created_at)}</span>
              </div>
              <div>
                {comment.body}
              </div>
            </div>
          </div>
        );
      }, commentIds)}
      <ButtonMore { ...moreButtonProps } />
    </div>
  );
}

const CommentExtensionContainer = inject(
  'commentStore',
  'entityStore',
  'requestStore',
  'paginateStore'
)(observer(({
  activity,
  commentStore,
  entityStore,
  requestStore,
  paginateStore
}) => {
  return (
    <CommentExtension
      activity={activity}
      commentIds={commentStore.comments.get(activity.id)}
      commentEntities={entityStore.getEntitiesByKey('comments')}
      userEntities={entityStore.getEntitiesByKey('users')}
      requestInProcess={requestStore.getRequestByType(getCommentProperty(activity.id))}
      nextHref={paginateStore.getLinkByType(getCommentProperty(activity.id))}
      onFetchComments={actions.fetchComments}
    />
  );
}));

CommentExtensionContainer.wrappedComponent.propTypes = {
  activity: PropTypes.object.isRequired,
  commentStore: PropTypes.object.isRequired,
  entityStore: PropTypes.object.isRequired,
  requestStore: PropTypes.object.isRequired,
  paginateStore: PropTypes.object.isRequired,
};

export default CommentExtensionContainer;
