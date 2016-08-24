import { FilterStore } from './';
import * as filterTypes from '../../constants/filterTypes';

describe('FilterStore', () => {

  const filterType = 'foo';
  const filterQuery = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new FilterStore();
      expect(store.query).to.equal('');
      expect(store.durationFilterType).to.equal(filterTypes.ALL);
    });
  });

  describe('setFilterDuration()', () => {
    it('sets a filter duration', () => {
      const store = new FilterStore();
      store.setFilterDuration(filterType);
      expect(store.durationFilterType).to.equal(filterType);
    });
  });

  describe('setFilterQuery()', () => {
    it('sets a filter duration', () => {
      const store = new FilterStore();
      store.setFilterQuery(filterQuery);
      expect(store.query).to.equal(filterQuery);
    });
  });

});
