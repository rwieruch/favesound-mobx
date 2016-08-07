import { apiUrl } from '../../services/api';
import { remove } from 'lodash';
import userStore from '../../stores/userStore';
import entityStore from '../../stores/entityStore';

export function like(track) {
  fetch(apiUrl(`me/favorites/${track.id}`, '?'), { method: track.user_favorite ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (track.user_favorite) {
        remove(userStore.favorites, (favorite) => favorite.id === track.id);
      } else {
        userStore.favorites.push(track.id);
      }

      const updateEntity = Object.assign({}, track, { user_favorite: !track.user_favorite });
      entityStore.syncEntities(updateEntity, 'tracks');
    });
}
