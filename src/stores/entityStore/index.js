import { observable, action } from 'mobx';

class EntityStore {

  @observable users;
  @observable tracks;

  constructor() {
    this.users = {};
    this.tracks = {};
  }

  @action syncEntities = (entity, key) => {
    this[key][entity.id] = entity;
  }

  @action mergeEntities = (key, entities) => {
    this[key] = { ...this[key], ...entities };
  }

}

const entityStore = new EntityStore();

export default entityStore;
export { EntityStore };
