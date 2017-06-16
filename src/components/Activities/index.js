import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import filter from 'lodash/fp/filter';
import * as actions from '../../actions/index';
import FetchOnScroll from '../../components/FetchOnScroll';
import TrackExtension from '../../components/TrackExtension';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackStream from '../../components/Track/stream';

const Activity = inject(
  'userStore',
  'entityStore',
  'playerStore',
  'sortStore',
  'filterStore'
)(observer(({
  activity,
  idx,
  userStore,
  entityStore,
  playerStore,
  sortStore,
  filterStore
}) => {
  return (
    <li>
      <TrackStream
        idx={idx}
        activity={activity}
        typeReposts={userStore.typeReposts}
        typeTracks={userStore.typeTracks}
        userEntities={entityStore.getEntitiesByKey('users')}
        isPlaying={playerStore.isPlaying}
        activeTrackId={playerStore.activeTrackId}
        activeSortType={sortStore.sortType}
        activeDurationFilterType={filterStore.durationFilterType}
        onActivateTrack={actions.activateTrack}
        onAddTrackToPlaylist={actions.addTrackToPlaylist}
      />
      <TrackExtension activity={activity} />
    </li>
  );
}));

const Activities = observer(({
  requestInProcess,
  ids,
  entities,
  activeFilter,
  activeSort,
}) => {
  const matchedEntities = map((id) => entities[id], ids);
  const filteredEntities = filter(activeFilter, matchedEntities);
  const sortedEntities = activeSort(filteredEntities);

  return (
    <div>
      <div>
        <ul>
          {map((activity, idx) => {
            const activityProps = { activity, idx };
            return <Activity key={idx} { ...activityProps } />;
          }, sortedEntities)}
        </ul>
      </div>
      <LoadingSpinner isLoading={requestInProcess || !ids} />
    </div>
  );
});

Activities.propTypes = {
  requestInProcess: PropTypes.bool,
  ids: PropTypes.object,
  entities: PropTypes.object,
  activeFilter: PropTypes.func,
  activeSort: PropTypes.func,
};

export default FetchOnScroll(Activities);
