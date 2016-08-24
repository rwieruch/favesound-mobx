import { observable, action, computed } from 'mobx';
import * as sortTypes from '../../constants/sortTypes';
import { SORT_FUNCTIONS } from '../../constants/sort';

class SortStore {

  @observable sortType;

  constructor() {
    this.sortType = sortTypes.NONE;
  }

  @action setSortType = (sortType) => {
    this.sortType = sortType;
  }

  @computed get sortFn() {
    return SORT_FUNCTIONS[this.sortType];
  }

}

const sortStore = new SortStore();

export default sortStore;
export { SortStore };
