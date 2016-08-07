import { observable, action } from 'mobx';
import * as sortTypes from '../../constants/sortTypes';

class SortStore {

  @observable sortType;

  constructor() {
    this.sortType = sortTypes.NONE;
  }

  @action setSortType = (sortType) => {
    this.sortType = sortType;
  }

}

const sortStore = new SortStore();

export default sortStore;
export { SortStore };
