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

function FollowersList({
  currentUser,
  userEntities,
  followers,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFollowers
}) {
  return (
    <List
      title="Followers"
      ids={followers}
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

export default observer(() => {
  return (
    <FollowersList
      currentUser={sessionStore.user}
      userEntities={entityStore.users}
      followers={userStore.followers}
      nextHref={paginateStore.links[paginateLinkTypes.FOLLOWERS]}
      requestInProcess={requestStore.requests[requestTypes.FOLLOWERS]}
      isExpanded={toggleStore.toggles[toggleTypes.FOLLOWERS]}
      onSetToggle={toggleStore.setToggle}
      onFetchFollowers={actions.fetchFollowers}
    />
  );
});
