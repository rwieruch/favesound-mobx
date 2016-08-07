import { observable, action } from 'mobx';

class ToggleStore {

  @observable toggles;

  constructor() {
    this.toggles = {};
  }

  @action setToggle = (type) => {
    this.toggleTypes[type] = !this.toggleTypes[type];
  }

}

const toggleStore = new ToggleStore();

export default toggleStore;
export { ToggleStore };
