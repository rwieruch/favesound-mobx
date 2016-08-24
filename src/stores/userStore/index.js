import { observable, action } from 'mobx';
import { forEach, remove, find } from 'lodash';

class UserStore {

  @observable followings;
  @observable activities;
  @observable followers;
  @observable favorites;
  @observable typeReposts;
  @observable typeTracks;

  constructor() {
    this.followings = [];
    this.activities = [];
    this.followers = [];
    this.favorites = [];
    this.typeReposts = {};
    this.typeTracks = {};
  }

  @action mergeActivities = (ids) => {
    forEach(ids, (id) => this.activities.push(id));
  }

  @action mergeFollowings = (ids) => {
    forEach(ids, (id) => this.followings.push(id));
  }

  isFollowing(userId) {
    return !!find(this.followings, (id) => userId === id);
  }

  @action mergeFollowers = (ids) => {
    forEach(ids, (id) => this.followers.push(id));
  }

  @action mergeFavorites = (ids) => {
    forEach(ids, (id) => this.favorites.push(id));
  }

  @action removeFromFollowings = (userId) => {
    remove(this.followings, (id) => userId === id);
  }

  @action removeFromFavorites = (trackId) => {
    remove(this.favorites, (id) => trackId === id);
  }

  @action mergeTypeTracks = (list) => {
    forEach(list, (item) => {
      if (this.typeTracks[item.id]) {
        this.typeTracks[item.id]++;
      } else {
        this.typeTracks[item.id] = 1;
      }
    });
  }

  @action mergeTypeReposts = (list) => {
    forEach(list, (item) => {
      if (this.typeReposts[item.id]) {
        this.typeReposts[item.id]++;
      } else {
        this.typeReposts[item.id] = 1;
      }
    });
  }

  @action reset = () => {
    this.followings = [];
    this.activities = [];
    this.typeReposts = {};
    this.typeTracks = {};
    this.followers = [];
    this.favorites = [];
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };
