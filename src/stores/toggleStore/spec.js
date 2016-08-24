import { ToggleStore } from './';

describe('ToggleStore', () => {

  const toggle = 'foo';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new ToggleStore();
      expect(store.toggles.toJS()).to.be.empty;
    });
  });

  describe('setToggle()', () => {
    it('sets a toggle', () => {
      const store = new ToggleStore();
      store.setToggle(toggle);
      expect(store.toggles.get(toggle)).to.be.true;
      store.setToggle(toggle);
      expect(store.toggles.get(toggle)).to.be.false;
    });
  });

});
