import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import { ButtonGhost } from '../../components/ButtonGhost';

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
  onOpenComments: React.PropTypes.func,
  onAddTrackToPlaylist: React.PropTypes.func,
};

export default observer(({ activity }) => {
  return (
    <TrackActions
      activity={activity}
      onOpenComments={actions.openComments}
      onAddTrackToPlaylist={actions.addTrackToPlaylist}
    />
  );
});
