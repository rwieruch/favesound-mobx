import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class BrowseStore {

  @observable activitiesByGenre;

  constructor() {
    this.activitiesByGenre = observable.map({});
  }

  @action mergeActivitiesByGenre = (genre, list) => {
    if (!this.activitiesByGenre.get(genre)) {
      this.activitiesByGenre.set(genre, []);
    }

    forEach(list, (item) => this.activitiesByGenre.get(genre).push(item));
  }

  getByGenre(genre) {
    return this.activitiesByGenre.get(genre);
  }

}

const browseStore = new BrowseStore();

export default browseStore;
export { BrowseStore };
