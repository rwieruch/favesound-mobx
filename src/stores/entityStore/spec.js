import { EntityStore } from './';

describe('EntityStore', () => {

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new EntityStore();
      expect(store.entities.toJS()).to.be.empty;
    });
  });

});
