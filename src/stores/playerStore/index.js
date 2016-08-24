import { observable, action } from 'mobx';
import { remove } from 'lodash';

class PlayerStore {

  @observable activeTrackId;
  @observable isPlaying;
  @observable playlist;

  constructor() {
    this.activeTrackId = null;
    this.isPlaying = false;
    this.playlist = [];
  }

  @action removeFromPlaylist = (id) => {
    remove(this.playlist, (trackId) => trackId === id);
  }

  @action setTrackInPlaylist = (id) => {
    this.playlist.push(id);
  }

  @action deactivateTrack = () => {
    this.activeTrackId = null;
  }

  @action setActiveTrack = (id) => {
    this.activeTrackId = id;
  }

  @action setIsPlaying = (isPlaying) => {
    this.isPlaying = isPlaying;
  }

  @action emptyPlaylist = () => {
    this.playlist = [];
  }

}

const playerStore = new PlayerStore();

export default playerStore;
export { PlayerStore };
