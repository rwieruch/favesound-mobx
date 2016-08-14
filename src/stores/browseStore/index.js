import { observable, action, extendObservable, map, computed } from 'mobx';
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
    return computed(() => {
        return this.activitiesByGenre.get(genre).toJS();
    });
  }

}

const browseStore = new BrowseStore();

export default browseStore;
export { BrowseStore };
