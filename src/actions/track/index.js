import { apiUrl } from '../../services/api';
import { syncEntities } from '../../actions/entities';
import { remove } from 'lodash';
import userStore from '../../stores/userStore';

export const like = (track) => (dispatch) => {
  fetch(apiUrl(`me/favorites/${track.id}`, '?'), { method: track.user_favorite ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (track.user_favorite) {
        remove(userStore.favorites, (favorite) => favorite.id === track.id);
      } else {
        userStore.favorites.push(track.id);
      }

      const updateEntity = Object.assign({}, track, { user_favorite: !track.user_favorite });
      dispatch(syncEntities(updateEntity, 'tracks'));
    });
};
