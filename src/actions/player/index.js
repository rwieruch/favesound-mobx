import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import * as toggleTypes from '../../constants/toggleTypes';
import { isSameTrackAndPlaying, isSameTrack } from '../../services/player';
import toggleStore from '../../stores/toggleStore';
import playerStore from '../../stores/playerStore';

export function clearPlaylist() {
  playerStore.emptyPlaylist();
  playerStore.deactivateTrack();
  toggleStore.toggles[toggleTypes.PLAYLIST] = false;
}

function isInPlaylist(playlist, trackId) {
  return find(isSameTrack(trackId), playlist);
}

export function togglePlayTrack(isPlaying) {
  playerStore.setIsPlaying(isPlaying);
}

export function activateTrack(trackId) {
  const playlist = playerStore.playlist;
  const previousActiveTrackId = playerStore.activeTrackId;
  const isCurrentlyPlaying = playerStore.isPlaying;
  const isPlaying = !isSameTrackAndPlaying(previousActiveTrackId, trackId, isCurrentlyPlaying);

  togglePlayTrack(isPlaying);
  playerStore.setActiveTrack(trackId);

  if (!isInPlaylist(playlist, trackId)) {
    playerStore.setTrackInPlaylist(trackId);
  }
}

export function addTrackToPlaylist(track) {
  const playlist = playerStore.playlist;

  if (!isInPlaylist(playlist, track.id)) {
    playerStore.setTrackInPlaylist(track.id);
  }

  if (!playlist.length) {
    activateTrack(track.id);
  }
}

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);
  return playlist[index + iterate];
}

export function activateIteratedTrack(currentActiveTrackId, iterate) {
  const playlist = playerStore.playlist;
  const nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);

  if (nextActiveTrackId) {
    activateTrack(nextActiveTrackId);
  } else {
    togglePlayTrack(false);
  }
}

export function removeTrackFromPlaylist(track) {
  const activeTrackId = playerStore.activeTrackId;
  const isPlaying = playerStore.isPlaying;
  const isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

  if (isRelevantTrack) {
    activateIteratedTrack(activeTrackId, 1);
  }

  const playlistSize = playerStore.playlist.length;
  if (playlistSize < 2) {
    playerStore.deactivateTrack();
    toggleStore.toggles[toggleTypes.PLAYLIST] = false;
  }

  playerStore.removeFromPlaylist(track.id);
}
