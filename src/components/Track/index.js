import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import { TrackPlaylist } from './playlist';
import { TrackPreview } from './preview';
import { TrackStream } from './stream';
import playerStore from '../../stores/playerStore';
import entityStore from '../../stores/entityStore';
import userStore from '../../stores/userStore';
import filterStore from '../../stores/filterStore';
import sortStore from '../../stores/sortStore';

// const TrackPlaylistContainer = observer(({ idx, activity }) => {
//   return (
//     <TrackPlaylist
//       idx={idx}
//       activity={activity}
//       typeReposts={userStore.typeReposts}
//       typeTracks={userStore.typeTracks}
//       userEntities={entityStore.users}
//       isPlaying={playerStore.isPlaying}
//       activeTrackId={playerStore.activeTrackId}
//       activeSortType={sortStore.sortType}
//       activeDurationFilterType={filterStore.durationFilterType}
//       onActivateTrack={actions.activateTrack}
//       onAddTrackToPlaylist={actions.addTrackToPlaylist}
//       onRemoveTrackFromPlaylist={actions.removeTrackFromPlaylist}
//     />
//   );
// });

function TrackContainer(component) {
  return observer(({ idx, activity }) => {
    return (
      <component
        idx={idx}
        activity={activity}
        typeReposts={userStore.typeReposts}
        typeTracks={userStore.typeTracks}
        userEntities={entityStore.users}
        isPlaying={playerStore.isPlaying}
        activeTrackId={playerStore.activeTrackId}
        activeSortType={sortStore.sortType}
        activeDurationFilterType={filterStore.durationFilterType}
        onActivateTrack={actions.activateTrack}
        onAddTrackToPlaylist={actions.addTrackToPlaylist}
        onRemoveTrackFromPlaylist={actions.removeTrackFromPlaylist}
      />
    );
  });
}

const TrackPreviewContainer = TrackContainer(TrackPreview);
const TrackStreamContainer = TrackContainer(TrackStream);
const TrackPlaylistContainer = TrackContainer(TrackPlaylist);

export {
  TrackPlaylistContainer,
  TrackPreviewContainer,
  TrackStreamContainer,
};
