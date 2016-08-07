import React from 'react';
import { observer } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { TrackPlaylistContainer } from '../../components/Track';
import { ButtonInline } from '../../components/ButtonInline';
import toggleStore from '../../stores/toggleStore';
import entityStore from '../../stores/entityStore';
import playerStore from '../../stores/playerStore';

function PlaylistItem({ activity }) {
  return (
    <li>
      <TrackPlaylistContainer activity={activity} />
    </li>
  );
}

function PlaylistMenu({ onClearPlaylist }) {
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
}

function Playlist({ playlistToggle, playlist, trackEntities, onClearPlaylist }) {
  const playlistClass = classNames(
    'playlist',
    {
      'playlist-visible': playlistToggle
    }
  );

  return (
    <div className={playlistClass}>
      <PlaylistMenu onClearPlaylist={onClearPlaylist} />
      <ul>
        {map((id, idx) => {
          return <PlaylistItem key={idx} activity={trackEntities[id]} />;
        }, playlist)}
      </ul>
    </div>
  );
}

Playlist.propTypes = {
  playlistToggle: React.PropTypes.object,
  playlist: React.PropTypes.array,
  trackEntities: React.PropTypes.object,
  onClearPlaylist: React.PropTypes.func
};

export default observer(() => {
  return (
    <Playlist
      playlistToggle={toggleStore[toggleTypes.PLAYLIST]}
      playlist={playerStore.playlist}
      trackEntities={entityStore.tracks}
      onClearPlaylist={actions.clearPlaylist}
    />
  );
});
