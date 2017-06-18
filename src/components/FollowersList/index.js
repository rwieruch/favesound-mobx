import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import List from '../../components/List';

export function FollowersList({
  userEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
  onSetToggle,
  onFetchFollowers
}) {
  return (
    <List
      title="Followers"
      ids={favorites}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FOLLOWERS)}
      onFetchMore={() => onFetchFollowers(currentUser, nextHref)}
      kind="USER"
    />
  );
}

const FollowersListContainer = inject(
  'sessionStore',
  'userStore',
  'entityStore',
  'paginateStore',
  'requestStore',
  'toggleStore'
)(observer(({
  sessionStore,
  userStore,
  entityStore,
  paginateStore,
  requestStore,
  toggleStore
}) => {
  return (
    <FollowersList
      userEntities={entityStore.getEntitiesByKey('users')}
      nextHref={paginateStore.getLinkByType(paginateLinkTypes.FOLLOWERS)}
      requestInProcess={requestStore.getRequestByType(requestTypes.FOLLOWERS)}
      isExpanded={toggleStore.toggles.get(toggleTypes.FOLLOWERS)}
      favorites={userStore.followers}
      currentUser={sessionStore.user}
      onFetchFollowers={actions.fetchFollowers}
      onSetToggle={toggleStore.setToggle}
    />
  );
}));

FollowersListContainer.wrappedComponent.propTypes = {
  sessionStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  entityStore: PropTypes.object.isRequired,
  paginateStore: PropTypes.object.isRequired,
  requestStore: PropTypes.object.isRequired,
  toggleStore: PropTypes.object.isRequired
};

export default FollowersListContainer;
