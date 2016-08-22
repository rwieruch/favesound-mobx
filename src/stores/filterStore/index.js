import { observable, action } from 'mobx';
import * as filterTypes from '../../constants/filterTypes';

class FilterStore {

  @observable durationFilterType;
  @observable query;

  constructor() {
    this.durationFilterType = filterTypes.ALL;
    this.query = '';
  }

  @action setFilterDuration = (filterType) => {
    this.durationFilterType = filterType;
  }

  @action setFilterQuery = (query) => {
    this.query = query;
  }

}

const filterStore = new FilterStore();

export default filterStore;
export { FilterStore };
