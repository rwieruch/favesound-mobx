import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import CommentExtension from '../../components/CommentExtension';
import commentStore from '../../stores/commentStore';

function TrackExtension({ activity, isOpenComment }) {
  if (isOpenComment) {
    return <CommentExtension activity={activity} />;
  }

  return null;
}

TrackExtension.propTypes = {
  activity: React.PropTypes.object,
  openComments: React.PropTypes.func,
};

const TrackExtensionContainer = observer(({ activity }) => {
  return (
    <TrackExtension
      activity={activity}
      isOpenComment={commentStore.openComments.get(activity.id)}
      openComments={() => actions.openComments(activity.id)}
    />
  );
});

TrackExtensionContainer.propTypes = {
  activity: React.PropTypes.object,
};

export default TrackExtensionContainer;
