import { observable, action } from 'mobx';
import * as filterTypes from '../../constants/filterTypes';

class FilterStore {

  @observable durationFilterType;
  @observable filterNameQuery;

  constructor() {
    this.durationFilterType = filterTypes.ALL;
    this.filterNameQuery = '';
  }

  @action filterDuration = (filterType) => {
    this.durationFilterType = filterType;
  }

  @action filterName = (filterName) => {
    this.filterNameQuery = filterName;
  }

}

const filterStore = new FilterStore();

export default filterStore;
export { FilterStore };
