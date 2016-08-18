import { observable, action, map } from 'mobx';
import { forEach } from 'lodash';

class EntityStore {

  @observable entities;

  constructor() {
    this.entities = map({});
  }

  @action syncEntities = (entity, key) => {
    this.entities.get(key).set(entity.id, entity);
  }

  @action mergeEntities = (key, entities) => {
    if (!this.entities.get(key)) {
      this.entities.set(key, map({}));
    }

    forEach(entities, (entity, entityKey) => this.entities.get(key).set(entityKey, entity));
  }

  getEntitiesByKey(key) {
    const entities = this.entities.get(key);
    return entities ? entities.toJS() : {};
  }

}

const entityStore = new EntityStore();

export default entityStore;
export { EntityStore };
