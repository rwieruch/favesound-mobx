import { SortStore } from './';
import * as sortTypes from '../../constants/sortTypes';

describe('SortStore', () => {

  const sortType = 'foo';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new SortStore();
      expect(store.sortType).to.equal(sortTypes.NONE);
    });
  });

  describe('setSortType()', () => {
    it('sets a sort type', () => {
      const store = new SortStore();
      store.setSortType(sortType);
      expect(store.sortType).to.equal(sortType);
    });
  });

});
