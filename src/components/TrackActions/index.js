import PropTypes from 'prop-types';
import React from 'react';
import * as actions from '../../actions/index';
import ButtonGhost from '../../components/ButtonGhost';

function TrackActions({ onOpenComments, onAddTrackToPlaylist }) {
  const isSmall = true;
  return (
    <div className="track-actions-list">
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={isSmall} onClick={onAddTrackToPlaylist}>
          <i className="fa fa-th-list" /> Add to Playlist
        </ButtonGhost>
      </div>
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={isSmall} onClick={onOpenComments}>
          <i className="fa fa-comment" /> Comment
        </ButtonGhost>
      </div>
    </div>
  );
}

TrackActions.propTypes = {
  onOpenComments: PropTypes.func,
  onAddTrackToPlaylist: PropTypes.func,
};

function TrackActionsContainer({ activity }) {
  return (
    <TrackActions
      activity={activity}
      onOpenComments={() => actions.openComments(activity.id)}
      onAddTrackToPlaylist={() => actions.addTrackToPlaylist(activity)}
    />
  );
}

export default TrackActionsContainer;
