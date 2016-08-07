import { observable, action } from 'mobx';

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
