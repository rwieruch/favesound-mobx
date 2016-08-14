import { observable, action, map } from 'mobx';
import { forEach } from 'lodash';

class BrowseStore {

  @observable activitiesByGenre;

  constructor() {
    this.activitiesByGenre = map({});
  }

  @action mergeActivitiesByGenre = (genre, list) => {
    if (!this.activitiesByGenre[genre]) {
      this.activitiesByGenre.set(genre, []);
    }

    forEach(list, (item) => this.activitiesByGenre.get(genre).push(item));
  }

  getByGenre(genre) {
    const byGenre = this.activitiesByGenre.get(genre);
    return byGenre ? byGenre.toJS() : [];
  }

}

const browseStore = new BrowseStore();

export default browseStore;
export { BrowseStore };
