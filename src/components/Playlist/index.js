import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { TrackPlaylist } from '../../components/Track/playlist';
import { ButtonInline } from '../../components/ButtonInline';

const PlaylistItem = inject(
  'entityStore',
  'playerStore'
)(observer(({
  activity,
  entityStore,
  playerStore
}) => {
  return (
    <li>
      <TrackPlaylist
        activity={activity}
        userEntities={entityStore.getEntitiesByKey('users')}
        isPlaying={playerStore.isPlaying}
        activeTrackId={playerStore.activeTrackId}
        onActivateTrack={actions.activateTrack}
        onRemoveTrackFromPlaylist={actions.removeTrackFromPlaylist}
      />
    </li>
  );
}));

const PlaylistMenu = observer(({
  onClearPlaylist
}) => {
  return (
    <div className="playlist-menu">
      <div>Player Queue</div>
      <div>
        <ButtonInline onClick={onClearPlaylist}>
          Clear Queue
        </ButtonInline>
      </div>
    </div>
  );
});

const Playlist = inject(
  'entityStore',
  'playerStore',
  'toggleStore'
)(observer(({
  entityStore,
  playerStore,
  toggleStore
}) => {
  const playlistToggle = toggleStore.toggles.get(toggleTypes.PLAYLIST);
  const playlist = playerStore.playlist;
  const trackEntities = entityStore.getEntitiesByKey('tracks');

  const playlistClass = classNames(
    'playlist',
    {
      'playlist-visible': playlistToggle
    }
  );

  return (
    <div className={playlistClass}>
      <PlaylistMenu onClearPlaylist={actions.clearPlaylist} />
      <ul>
        {map((id, idx) => {
          return <PlaylistItem key={idx} activity={trackEntities[id]} />;
        }, playlist)}
      </ul>
    </div>
  );
}));

Playlist.wrappedComponent.propTypes = {
  entityStore: React.PropTypes.object,
  playerStore: React.PropTypes.object,
  toggleStore: React.PropTypes.object,
};

export default Playlist;
