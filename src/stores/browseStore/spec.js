import { BrowseStore } from './';

describe('BrowseStore', () => {

  const activity = 'foo';
  const activityKey = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new BrowseStore();
      expect(store.activitiesByGenre.toJS()).to.be.empty;
    });
  });

  describe('mergeActivitiesByGenre()', () => {
    it('merges activities in a list under a genre', () => {
      const store = new BrowseStore();
      store.mergeActivitiesByGenre(activityKey, [activity]);
      expect(store.activitiesByGenre.get(activityKey).toJS()).to.have.length(1);
      store.mergeActivitiesByGenre(activityKey, [activity]);
      expect(store.activitiesByGenre.get(activityKey).toJS()).to.have.length(2);
    });
  });

  describe('getByGenre()', () => {
    it('gets activities by genre', () => {
      const store = new BrowseStore();
      store.mergeActivitiesByGenre(activityKey, [activity]);
      expect(store.getByGenre(activityKey).toJS()).to.have.length(1);
    });
  });

});
