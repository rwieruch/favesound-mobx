import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import List from '../../components/List';

export function FollowingsList({
  userEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
  onSetToggle,
  onFetchFollowings
}) {
  return (
    <List
      title="Followings"
      ids={favorites}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FOLLOWINGS)}
      onFetchMore={() => onFetchFollowings(currentUser, nextHref)}
      kind="USER"
    />
  );
}

const FollowingsListContainer = inject(
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
    <FollowingsList
      userEntities={entityStore.getEntitiesByKey('users')}
      nextHref={paginateStore.getLinkByType(paginateLinkTypes.FOLLOWINGS)}
      requestInProcess={requestStore.getRequestByType(requestTypes.FOLLOWINGS)}
      isExpanded={toggleStore.toggles.get(toggleTypes.FOLLOWINGS)}
      favorites={userStore.followings}
      currentUser={sessionStore.user}
      onFetchFollowings={actions.fetchFollowings}
      onSetToggle={toggleStore.setToggle}
    />
  );
}));

FollowingsListContainer.wrappedComponent.propTypes = {
  sessionStore: React.PropTypes.object.isRequired,
  userStore: React.PropTypes.object.isRequired,
  entityStore: React.PropTypes.object.isRequired,
  paginateStore: React.PropTypes.object.isRequired,
  requestStore: React.PropTypes.object.isRequired,
  toggleStore: React.PropTypes.object.isRequired
};

export default FollowingsListContainer;
