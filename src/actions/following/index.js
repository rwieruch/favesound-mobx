import { apiUrl } from '../../services/api';
import userStore from '../../stores/userStore';

export function follow(user) {
  const isFollowing = userStore.isFollowing(user.id);

  fetch(apiUrl(`me/followings/${user.id}`, '?'), { method: isFollowing ? 'delete' : 'put' })
    .then(response => response.json())
    .then(() => {
      if (isFollowing) {
        userStore.removeFromFollowings(user.id);
      } else {
        userStore.mergeFollowings([user.id]);
      }
    });
}
