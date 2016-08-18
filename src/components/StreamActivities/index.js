import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { getAndCombined } from '../../services/filter';
import Activities from '../../components/Activities';
import { StreamInteractions } from '../../components/StreamInteractions';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import { getTracknameFilter } from '../../constants/nameFilter';
import { SORT_FUNCTIONS } from '../../constants/sort';

const StreamActivities = inject(
  'userStore',
  'entityStore',
  'paginateStore',
  'requestStore',
  'sortStore',
  'filterStore'
)(observer(({
  userStore,
  entityStore,
  paginateStore,
  requestStore,
  sortStore,
  filterStore
}) => {
  const filters = [
    DURATION_FILTER_FUNCTIONS[filterStore.durationFilterType],
    getTracknameFilter(filterStore.filterNameQuery)
  ];

  const nextHref = paginateStore.links[paginateLinkTypes.ACTIVITIES];

  return (
    <div>
      <StreamInteractions />
      <Activities
        requestInProcess={requestStore.getRequestByType(requestTypes.ACTIVITIES)}
        entities={entityStore.getEntitiesByKey('tracks')}
        ids={userStore.activities}
        activeFilter={getAndCombined(filters)}
        activeSort={SORT_FUNCTIONS[sortStore.sortType]}
        scrollFunction={() => actions.fetchActivities(null, nextHref)}
      />
    </div>
  );
}));

StreamActivities.propTypes = {
  userStore: React.PropTypes.object,
  entityStore: React.PropTypes.object,
  playerStore: React.PropTypes.object,
  paginateStore: React.PropTypes.object,
  requestStore: React.PropTypes.object,
  sortStore: React.PropTypes.object,
  filterStore: React.PropTypes.object
};

export default StreamActivities;
