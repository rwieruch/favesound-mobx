import { observable, action } from 'mobx';
import { forEach, remove, find } from 'lodash';

class UserStore {

  @observable followings;
  @observable activities;
  @observable typeReposts;
  @observable typeTracks;
  @observable followers;
  @observable favorites;

  constructor() {
    this.followings = [];
    this.activities = [];
    this.typeReposts = {};
    this.typeTracks = {};
    this.followers = [];
    this.favorites = [];
  }

  @action mergeActivities = (ids) => {
    forEach(ids, (id) => this.activities.push(id));
  }

  @action mergeFollowings = (ids) => {
    forEach(ids, (id) => this.followings.push(id));
  }

  isFollowing(userId) {
    return find(this.followings, (id) => userId === id);
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
