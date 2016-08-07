import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { getAndCombined } from '../../services/filter';
import Activities from '../../components/Activities';
import { StreamInteractions } from '../../components/StreamInteractions';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import { getTracknameFilter } from '../../constants/nameFilter';
import { SORT_FUNCTIONS } from '../../constants/sort';
import entityStore from '../../stores/entityStore';
import userStore from '../../stores/userStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';
import filterStore from '../../stores/filterStore';
import sortStore from '../../stores/sortStore';

function StreamActivities({
  activities,
  requestInProcess,
  nextHref,
  trackEntities,
  activeFilter,
  activeSort,
  onFetchActivities,
}) {
  return (
    <div>
      <StreamInteractions />
      <Activities
        requestInProcess={requestInProcess}
        entities={trackEntities}
        ids={activities}
        activeFilter={activeFilter}
        activeSort={activeSort}
        scrollFunction={() => onFetchActivities(null, nextHref)}
      />
    </div>
  );
}

StreamActivities.propTypes = {
  trackEntities: React.PropTypes.object,
  activities: React.PropTypes.array,
  requestInProcess: React.PropTypes.bool,
  nextHref: React.PropTypes.string,
  activeFilter: React.PropTypes.func,
  activeSort: React.PropTypes.func,
  onFetchActivities: React.PropTypes.func,
};

export default observer(() => {
  const filters = [
    DURATION_FILTER_FUNCTIONS[filterStore.durationFilterType],
    getTracknameFilter(filterStore.filterNameQuery)
  ];
  return (
    <StreamActivities
      activities={userStore.activities}
      requestInProcess={requestStore.requests[requestTypes.ACTIVITIES]}
      nextHref={paginateStore.linkgs[paginateLinkTypes.ACTIVITIES]}
      trackEntities={entityStore.tracks}
      activeFilter={getAndCombined(filters)}
      activeSort={SORT_FUNCTIONS[sortStore.sortType]}
      onFetchActivities={actions.fetchActivities}
    />
  );
});
