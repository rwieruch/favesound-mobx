import { RequestStore } from './';

describe('RequestStore', () => {

  const request = 'foo';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new RequestStore();
      expect(store.requests.toJS()).to.be.empty;
    });
  });

  describe('setRequestInProcess()', () => {
    it('sets a request in process', () => {
      const store = new RequestStore();
      store.setRequestInProcess(request, true);
      expect(store.requests.get(request)).to.be.true;
    });
  });

  describe('getRequestByType()', () => {
    it('gets a request by type', () => {
      const store = new RequestStore();
      store.setRequestInProcess(request, true);
      expect(store.getRequestByType(request)).to.be.true;
    });
  });

});
