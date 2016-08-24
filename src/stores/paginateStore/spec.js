import { PaginateStore } from './';

describe('PaginateStore', () => {

  const paginateType = 'foo';
  const link = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new PaginateStore();
      expect(store.links).to.be.empty;
    });
  });

  describe('setPaginateLink()', () => {
    it('sets a link', () => {
      const store = new PaginateStore();
      store.setPaginateLink(paginateType, link);
      expect(store.links[paginateType]).to.equal(link);
    });
  });

  describe('getLinkByType()', () => {
    it('gets a link', () => {
      const store = new PaginateStore();
      store.setPaginateLink(paginateType, link);
      expect(store.getLinkByType(paginateType)).to.equal(link);
    });
  });

});
