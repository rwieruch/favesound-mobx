import PropTypes from 'prop-types';
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
  activity: PropTypes.object,
  openComments: PropTypes.func,
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
  activity: PropTypes.object,
};

export default TrackExtensionContainer;
