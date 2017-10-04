import { observable, action } from 'mobx';

class ToggleStore {

  @observable toggles;

  constructor() {
    this.toggles = observable.map({});
  }

  @action setToggle = (type) => {
    this.toggles.set(type, !this.toggles.get(type));
  }

}

const toggleStore = new ToggleStore();

export default toggleStore;
export { ToggleStore };
