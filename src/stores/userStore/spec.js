import { UserStore } from './';

describe('UserStore', () => {

  const followings = ['a'];
  const activities = ['b'];
  const followers = ['c'];
  const favorites = ['d'];
  const typeReposts = { id: '1' };
  const typeTracks = { id: '2' };
  const tracks = [{ id: '1' }, { id: '3' }, { id: '3' }];

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new UserStore();
      expect(store.followings).to.be.empty;
      expect(store.activities).to.be.empty;
      expect(store.followers).to.be.empty;
      expect(store.favorites).to.be.empty;
      expect(store.typeReposts).to.be.empty;
      expect(store.typeTracks).to.be.empty;
    });
  });

  describe('mergeFollowings()', () => {
    it('merges followings', () => {
      const store = new UserStore();
      store.mergeFollowings(followings);
      expect(store.followings).to.have.length(1);
      store.mergeFollowings(followings);
      expect(store.followings).to.have.length(2);
    });
  });

  describe('mergeFavorites()', () => {
    it('merges favorites', () => {
      const store = new UserStore();
      store.mergeFavorites(favorites);
      expect(store.favorites).to.have.length(1);
      store.mergeFavorites(favorites);
      expect(store.favorites).to.have.length(2);
    });
  });

  describe('mergeFollowers()', () => {
    it('merges followers', () => {
      const store = new UserStore();
      store.mergeFollowers(followers);
      expect(store.followers).to.have.length(1);
      store.mergeFollowers(followers);
      expect(store.followers).to.have.length(2);
    });
  });

  describe('mergeActivities()', () => {
    it('merges activities', () => {
      const store = new UserStore();
      store.mergeActivities(activities);
      expect(store.activities).to.have.length(1);
      store.mergeActivities(activities);
      expect(store.activities).to.have.length(2);
    });
  });

  describe('isFollowing()', () =>{
    it('returns true if someone is following', () => {
      const store = new UserStore();
      store.mergeFollowings(followings);
      expect(store.isFollowing(followings[0])).to.be.true;
    });

    it('returns false if someone is not following', () => {
      const store = new UserStore();
      store.mergeFollowings(followings);
      expect(store.isFollowing('b')).to.be.false;
    });
  });

  describe('removeFromFollowings()', () =>{
    it('removes a following', () => {
      const store = new UserStore();
      store.mergeFollowings(followings);
      store.removeFromFollowings(followings[0])
      expect(store.followings).to.be.empty;
    });
  });

  describe('removeFromFavorites()', () =>{
    it('removes a following', () => {
      const store = new UserStore();
      store.mergeFavorites(favorites);
      store.removeFromFavorites(favorites[0])
      expect(store.favorites).to.be.empty;
    });
  });

  describe('mergeTypeTracks()', () =>{
    it('counts the times a track type is merged', () => {
      const store = new UserStore();
      store.mergeTypeTracks(tracks);
      expect(store.typeTracks['3']).to.equal(2);
    });
  });

  describe('mergeTypeReposts()', () =>{
    it('counts the times a track type repost is merged', () => {
      const store = new UserStore();
      store.mergeTypeReposts(tracks);
      expect(store.typeReposts['3']).to.equal(2);
    });
  });

  describe('reset()', () => {
    it('resets the state', () => {
      const store = new UserStore();
      store.mergeFollowings(followings);
      store.mergeFavorites(favorites);
      store.mergeFollowers(followers);
      store.mergeActivities(activities);
      store.reset();
      expect(store.followings).to.be.empty;
      expect(store.activities).to.be.empty;
      expect(store.followers).to.be.empty;
      expect(store.favorites).to.be.empty;
      expect(store.typeReposts).to.be.empty;
      expect(store.typeTracks).to.be.empty;
    });
  });

});
