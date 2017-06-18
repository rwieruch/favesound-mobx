import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import Activities from '../../components/Activities';
import StreamInteractions from '../../components/StreamInteractions';

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
  const nextHref = paginateStore.getLinkByType(paginateLinkTypes.ACTIVITIES);

  return (
    <div>
      <StreamInteractions />
      <Activities
        requestInProcess={requestStore.getRequestByType(requestTypes.ACTIVITIES)}
        ids={userStore.activities}
        entities={entityStore.getEntitiesByKey('tracks')}
        activeFilter={filterStore.combinedFilters}
        activeSort={sortStore.sortFn}
        scrollFunction={() => actions.fetchActivities(null, nextHref)}
      />
    </div>
  );
}));

StreamActivities.wrappedComponent.propTypes = {
  userStore: PropTypes.object,
  entityStore: PropTypes.object,
  playerStore: PropTypes.object,
  paginateStore: PropTypes.object,
  requestStore: PropTypes.object,
  sortStore: PropTypes.object,
  filterStore: PropTypes.object
};

export default StreamActivities;
