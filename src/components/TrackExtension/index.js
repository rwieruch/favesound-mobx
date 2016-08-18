import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import CommentExtension from '../../components/CommentExtension';
import commentStore from '../../stores/commentStore';

function TrackExtension({ activity, isOpenComment }) {
  if (isOpenComment) {
    return <CommentExtension activity={activity} />;
  }

  return <noscript />;
}

TrackExtension.propTypes = {
  activity: React.PropTypes.object,
  openComments: React.PropTypes.func,
};

export default observer(({ activity }) => {
  return (
    <TrackExtension
      activity={activity}
      isOpenComment={commentStore.openComments.get(activity.id)}
      openComments={() => actions.openComments(activity.id)}
    />
  );
});
