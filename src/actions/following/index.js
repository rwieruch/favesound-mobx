import { find, remove } from 'lodash';
import { apiUrl } from '../../services/api';
import userStore from '../../stores/userStore';

export function follow(user) {
  const isFollowing = find(userStore.followings, (following) => following === user.id);

  fetch(apiUrl(`me/followings/${user.id}`, '?'), { method: isFollowing ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (isFollowing) {
        remove(userStore.followings, (following) => following.id === user.id);
      } else {
        userStore.followings.push(user.id);
      }
    });
}
