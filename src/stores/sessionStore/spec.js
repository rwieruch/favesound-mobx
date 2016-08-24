import { SessionStore } from './';

describe('SessionStore', () => {

  const session = 'foo';
  const user = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new SessionStore();
      expect(store.session).to.equal(null);
      expect(store.user).to.equal(null);
    });
  });

  describe('setSession()', () => {
    it('sets a session', () => {
      const store = new SessionStore();
      store.setSession(session);
      expect(store.session).to.equal(session);
    });
  });

  describe('setMe()', () => {
    it('sets an user', () => {
      const store = new SessionStore();
      store.setMe(user);
      expect(store.user).to.equal(user);
    });
  });

  describe('reset()', () => {
    it('resets the state', () => {
      const store = new SessionStore();
      store.setMe(user);
      store.setSession(session);
      store.reset();
      expect(store.user).to.equal(null);
      expect(store.session).to.equal(null);
    });
  });

});
