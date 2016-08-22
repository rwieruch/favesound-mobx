import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import { List } from '../../components/List';

const FavoritesList = inject(
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
  const trackEntities = entityStore.getEntitiesByKey('tracks');
  const nextHref = paginateStore.getLinkByType(paginateLinkTypes.FAVORITES);
  const requestInProcess = requestStore.getRequestByType(requestTypes.FAVORITES);
  const isExpanded = toggleStore.toggles.get(toggleTypes.FAVORITES);

  return (
    <List
      title="Favorites"
      ids={userStore.favorites}
      entities={trackEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={sessionStore.user}
      onToggleMore={() => toggleStore.setToggle(toggleTypes.FAVORITES)}
      onFetchMore={() => actions.fetchFavorites(sessionStore.user, nextHref)}
      kind="TRACK"
    />
  );
}));

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

export default FavoritesList;
