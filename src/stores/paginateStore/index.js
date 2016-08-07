import { observable, action } from 'mobx';

class PaginateStore {

  @observable links;

  constructor() {
    this.links = {};
  }

  @action setPaginateLink = (paginateType, nextHref) => {
    this.links[paginateType] = nextHref;
  }

}

const paginateStore = new PaginateStore();

export default paginateStore;
export { PaginateStore };
