import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { List } from '../../components/List';

const FollowersList = inject(
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
  const nextHref = paginateStore.getLinkByType(paginateLinkTypes.FOLLOWERS);
  const requestInProcess = requestStore.getRequestByType(requestTypes.FOLLOWERS);
  const isExpanded = toggleStore.toggles.get(toggleTypes.FOLLOWERS);

  return (
    <List
      title="Followers"
      ids={userStore.followers}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={sessionStore.user}
      onToggleMore={() => toggleStore.setToggle(toggleTypes.FOLLOWERS)}
      onFetchMore={() => actions.fetchFollowers(sessionStore.user, nextHref)}
      kind="USER"
    />
  );
}));

FollowersList.propTypes = {
  currentUser: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  followers: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  onSetToggle: React.PropTypes.func,
  onFetchFollowers: React.PropTypes.func
};

export default FollowersList;
