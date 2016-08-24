import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import * as toggleTypes from '../../constants/toggleTypes';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';
import toggleStore from '../../stores/toggleStore';
import playerStore from '../../stores/playerStore';

export function clearPlaylist() {
  playerStore.emptyPlaylist();
  playerStore.deactivateTrack();
  toggleStore.setToggle(toggleTypes.PLAYLIST);
}

function isInPlaylist(playlist, trackId) {
  return find(isSameTrack(trackId), playlist);
}

export function togglePlayTrack(isPlaying) {
  playerStore.setIsPlaying(isPlaying);
}

export function activateTrack(trackId) {
  const { playlist, activeTrackId, isPlaying } = playerStore;

  const isSamePlaying = !isSameTrackAndPlaying(activeTrackId, trackId, isPlaying);

  togglePlayTrack(isSamePlaying);
  playerStore.setActiveTrack(trackId);

  if (!isInPlaylist(playlist, trackId)) {
    playerStore.setTrackInPlaylist(trackId);
  }
}

export function addTrackToPlaylist(track) {
  if (!playerStore.playlist.length) {
    activateTrack(track.id);
  }

  if (!isInPlaylist(playerStore.playlist, track.id)) {
    playerStore.setTrackInPlaylist(track.id);
  }
}

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);
  const nextIndex = index + iterate;
  if (nextIndex < playlist.length && nextIndex > -1) {
    return playlist[nextIndex];
  } else if (iterate === 1) {
    return playlist[0];
  } else if (iterate === -1) {
    return playlist[playlist.length - 1];
  }
}

export function activateIteratedTrack(currentActiveTrackId, iterate) {
  const nextActiveTrackId = getIteratedTrack(playerStore.playlist, currentActiveTrackId, iterate);

  if (nextActiveTrackId) {
    activateTrack(nextActiveTrackId);
  } else {
    togglePlayTrack(false);
  }
}

export function removeTrackFromPlaylist(track) {
  const activeTrackId = playerStore.activeTrackId;
  const isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, playerStore.isPlaying);

  if (isRelevantTrack) {
    activateIteratedTrack(activeTrackId, 1);
  }

  const playlistSize = playerStore.playlist.length;
  if (playlistSize < 2) {
    playerStore.deactivateTrack();
    toggleStore.setToggle(toggleTypes.PLAYLIST);
  }

  playerStore.removeFromPlaylist(track.id);
}
