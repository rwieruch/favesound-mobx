import React from 'react';
import { observer } from 'mobx-react';
import map from '../../services/map';
import * as actions from '../../actions/index';
import { getCommentProperty } from '../../services/string';
import { ButtonMore } from '../../components/ButtonMore';
import { Artwork } from '../../components/Artwork';
import { fromNow } from '../../services/track';
import entityStore from '../../stores/entityStore';
import commentStore from '../../stores/commentStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';

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

CommentExtension.propTypes = {
  onFetchComments: React.PropTypes.func,
  activity: React.PropTypes.object,
  commentIds: React.PropTypes.array,
  commentEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  requestInProcess: React.PropTypes.bool,
  nextHref: React.PropTypes.string,
};

export default observer(({ activity }) => {
  return (
    <CommentExtension
      activity={activity}
      commentIds={commentStore.comments[activity.id]}
      commentEntities={entityStore.comments}
      userEntities={entityStore.users}
      requestInProcess={requestStore.requests[getCommentProperty(activity.id)]}
      nextHref={paginateStore.links[getCommentProperty(activity.id)]}
      onFetchComments={actions.fetchComments}
    />
  );
});
