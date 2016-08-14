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

function FavoritesList({
  currentUser,
  trackEntities,
  favorites,
  nextHref,
  requestInProcess,
  isExpanded,
  onSetToggle,
  onFetchFavorites
}) {
  return (
    <List
      title="Favorites"
      ids={favorites}
      entities={trackEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={() => onSetToggle(toggleTypes.FAVORITES)}
      onFetchMore={() => onFetchFavorites(currentUser, nextHref)}
      kind="TRACK"
    />
  );
}

FavoritesList.propTypes = {
  currentUser: React.PropTypes.object,
  trackEntities: React.PropTypes.object,
  favorites: React.PropTypes.array,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  toggle: React.PropTypes.object,
  onSetToggle: React.PropTypes.func,
  onFetchFavorites: React.PropTypes.func
};

export default observer(() => {
  return (
    <FavoritesList
      currentUser={sessionStore.user}
      trackEntities={entityStore.getEntitiesByKey('tracks')}
      favorites={userStore.favorites}
      nextHref={paginateStore.links[paginateLinkTypes.FAVORITES]}
      requestInProcess={requestStore.getRequestByType(requestTypes.FAVORITES)}
      isExpanded={toggleStore.toggles[toggleTypes.FAVORITES]}
      onSetToggle={toggleStore.setToggle}
      onFetchFavorites={actions.fetchFavorites}
    />
  );
});
