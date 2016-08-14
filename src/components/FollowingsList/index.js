import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { List } from '../../components/List';
import toggleStore from '../../stores/toggleStore';
import sessionStore from '../../stores/sessionStore';
import entityStore from '../../stores/entityStore';
import userStore from '../../stores/userStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';

function FollowingsList({
  currentUser,
  userEntities,
  followings,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFollowings
}) {
  return (
    <List
      title="Followings"
      ids={followings}
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

export default observer(() => {
  return (
    <FollowingsList
      currentUser={sessionStore.user}
      userEntities={entityStore.getEntitiesByKey('users')}
      followings={userStore.followings}
      nextHref={paginateStore.links[paginateLinkTypes.FOLLOWINGS]}
      requestInProcess={requestStore.getRequestByType(requestTypes.FOLLOWINGS)}
      isExpanded={toggleStore.toggles[toggleTypes.FOLLOWINGS]}
      onSetToggle={toggleStore.setToggle}
      onFetchFollowings={actions.fetchFollowings}
    />
  );
});
