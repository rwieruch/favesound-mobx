import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import * as actions from '../../actions/index';
import TrackPreview from '../../components/Track/preview';
import UserPreview from '../../components/User';
import ButtonMore from '../../components/ButtonMore';
import ButtonInline from '../../components/ButtonInline';

export function Chevron({ ids, isExpanded }) {
  const chevronClass = classNames(
    'fa',
    {
      'fa-chevron-up': isExpanded,
      'fa-chevron-down': !isExpanded
    }
  );

  return ids.length > 4 ? <i className={chevronClass} /> : null;
}

const TrackPreviewContainer = inject(
  'entityStore',
  'playerStore'
)(observer(({
  activity,
  entityStore,
  playerStore
}) => {
  return (
    <TrackPreview
      activity={activity}
      isPlaying={playerStore.isPlaying}
      activeTrackId={playerStore.activeTrackId}
      userEntities={entityStore.getEntitiesByKey('users')}
      onActivateTrack={actions.activateTrack}
      onAddTrackToPlaylist={actions.addTrackToPlaylist}
    />
  );
}));

function SpecificItemTrack({ entities, trackId }) {
  return (
    <li>
      <TrackPreviewContainer activity={entities[trackId]} />
    </li>
  );
}

function SpecificItemUser({ entities, userId }) {
  return (
    <li>
      <UserPreview user={entities[userId]} />
    </li>
  );
}

export function SpecificList({ ids, kind, entities }) {
  if (kind === 'USER') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const userProps = { userId: id, entities };
            return <SpecificItemUser key={idx} { ...userProps } />;
          }, ids)}
        </ul>
      </div>
    );
  }

  if (kind === 'TRACK') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const trackProps = { trackId: id, entities };
            return <SpecificItemTrack key={idx} { ...trackProps } />;
          }, ids)}
        </ul>
      </div>
    );
  }
}

function List({
  ids,
  isExpanded,
  title,
  kind,
  requestInProcess,
  entities,
  onToggleMore,
  nextHref,
  onFetchMore
}) {
  const listClass = classNames({
    'more-visible': isExpanded
  });

  return (
    <div className="list">
      <h2>
        <ButtonInline onClick={onToggleMore}>
          {title} <Chevron ids={ids} isExpanded={isExpanded} />
        </ButtonInline>
      </h2>
      <div className={listClass}>
        <SpecificList
          ids={ids}
          kind={kind}
          entities={entities}
        />
        <ButtonMore
          nextHref={nextHref}
          onClick={onFetchMore}
          requestInProcess={requestInProcess || !ids}
          isHidden={!isExpanded}
        />
      </div>
    </div>
  );
}

List.propTypes = {
  ids: PropTypes.object,
  isExpanded: PropTypes.bool,
  title: PropTypes.string,
  kind: PropTypes.string,
  requestInProcess: PropTypes.bool,
  entities: PropTypes.object,
  nextHref: PropTypes.string,
  onToggleMore: PropTypes.func,
  onFetchMore: PropTypes.func
};

export default List;
