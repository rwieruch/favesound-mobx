import { PlayerStore } from './';

describe('PlayerStore', () => {

  const trackOne = 'foo';
  const trackTwo = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new PlayerStore();
      expect(store.activeTrackId).to.equal(null);
      expect(store.isPlaying).to.be.false;
      expect(store.playlist).to.be.empty;
    });
  });

  describe('setTrackInPlaylist()', () => {
    it('sets a track in the playlist', () => {
      const store = new PlayerStore();
      store.setTrackInPlaylist(trackOne);
      store.setTrackInPlaylist(trackTwo)
      expect(store.playlist[0]).to.equal(trackOne);
      expect(store.playlist[1]).to.equal(trackTwo);
      expect(store.playlist).to.have.length(2);
    });
  });

  describe('removeFromPlaylist()', () => {
    it('removes a track in the playlist', () => {
      const store = new PlayerStore();
      store.setTrackInPlaylist(trackOne);
      store.removeFromPlaylist(trackOne);
      expect(store.playlist).to.be.empty;
    });
  });

  describe('setActiveTrack()', () => {
    it('sets an active track in the playlist', () => {
      const store = new PlayerStore();
      store.setActiveTrack(trackOne);
      expect(store.activeTrackId).to.equal(trackOne);
    });
  });

  describe('deactivateTrack()', () => {
    it('deactivates the active track in the playlist', () => {
      const store = new PlayerStore();
      store.setActiveTrack(trackOne);
      store.deactivateTrack();
      expect(store.activeTrackId).to.equal(null);
    });
  });

  describe('setIsPlaying()', () => {
    it('sets the player to playing', () => {
      const store = new PlayerStore();
      store.setIsPlaying(true);
      expect(store.isPlaying).to.be.true;
    });
  });

  describe('emptyPlaylist()', () => {
    it('empties the playlist', () => {
      const store = new PlayerStore();
      store.setTrackInPlaylist(trackOne);
      store.emptyPlaylist();
      expect(store.playlist).to.be.empty;
    });
  });

});
