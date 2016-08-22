import { observable, action } from 'mobx';

class PaginateStore {

  @observable links;

  constructor() {
    this.links = {};
  }

  @action setPaginateLink = (paginateType, nextHref) => {
    this.links[paginateType] = nextHref;
  }

  getLinkByType(paginateType) {
    return this.links[paginateType];
  }

}

const paginateStore = new PaginateStore();

export default paginateStore;
export { PaginateStore };
