import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class EntityStore {

  @observable entities;

  constructor() {
    this.entities = observable.map({});
  }

  @action syncEntities = (entity, key) => {
    this.entities.get(key).set(entity.id, entity);
  }

  @action mergeEntities = (key, entities) => {
    if (!this.entities.get(key)) {
      this.entities.set(key, observable.map({}));
    }

    forEach(entities, (entity, entityKey) => this.entities.get(key).set(entityKey, entity));
  }

  getEntitiesByKey(key) {
    const entities = this.entities.get(key);
    return entities ? entities.toJSON() : {};
  }

}

const entityStore = new EntityStore();

export default entityStore;
export { EntityStore };
