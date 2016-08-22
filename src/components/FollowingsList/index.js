import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { List } from '../../components/List';

const FollowingsList = inject(
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
  const userEntities = entityStore.getEntitiesByKey('users');
  const nextHref = paginateStore.getLinkByType(paginateLinkTypes.FOLLOWINGS);
  const requestInProcess = requestStore.getRequestByType(requestTypes.FOLLOWINGS);
  const isExpanded = toggleStore.toggles.get(toggleTypes.FOLLOWINGS);

  return (
    <List
      title="Followings"
      ids={userStore.followings}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={sessionStore.user}
      onToggleMore={() => toggleStore.setToggle(toggleTypes.FOLLOWINGS)}
      onFetchMore={() => actions.fetchFollowings(sessionStore.user, nextHref)}
      kind="USER"
    />
  );
}));

FollowingsList.propTypes = {
  currentUser: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  followings: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  onSetToggle: React.PropTypes.func,
  onFetchFollowings: React.PropTypes.func
};

export default FollowingsList;
