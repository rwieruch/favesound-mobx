import { observable, action } from 'mobx';

class RequestStore {

  @observable requests;

  constructor() {
    this.requests = {};
  }

  @action setRequestInProcess = (requestType, inProcess) => {
    this.requests[requestType] = inProcess;
  }

}

const requestStore = new RequestStore();

export default requestStore;
export { RequestStore };
