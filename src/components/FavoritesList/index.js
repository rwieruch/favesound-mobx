import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import List from '../../components/List';

export function FavoritesList({
  trackEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
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

const FavoritesListContainer = inject(
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
    <FavoritesList
      trackEntities={entityStore.getEntitiesByKey('tracks')}
      nextHref={paginateStore.getLinkByType(paginateLinkTypes.FAVORITES)}
      requestInProcess={requestStore.getRequestByType(requestTypes.FAVORITES)}
      isExpanded={toggleStore.toggles.get(toggleTypes.FAVORITES)}
      favorites={userStore.favorites}
      currentUser={sessionStore.user}
      onFetchFavorites={actions.fetchFavorites}
      onSetToggle={toggleStore.setToggle}
    />
  );
}));

FavoritesListContainer.wrappedComponent.propTypes = {
  sessionStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  entityStore: PropTypes.object.isRequired,
  paginateStore: PropTypes.object.isRequired,
  requestStore: PropTypes.object.isRequired,
  toggleStore: PropTypes.object.isRequired
};

export default FavoritesListContainer;
