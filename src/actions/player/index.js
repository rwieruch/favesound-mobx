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

export const activateTrack = (trackId) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const previousActiveTrackId = getState().player.activeTrackId;
  const isCurrentlyPlaying = getState().player.isPlaying;
  const isPlaying = !isSameTrackAndPlaying(previousActiveTrackId, trackId, isCurrentlyPlaying);

  dispatch(togglePlayTrack(isPlaying));
  playerStore.setActiveTrack(trackId);

  if (!isInPlaylist(playlist, trackId)) {
    playerStore.setTrackInPlaylist(trackId);
  }
};

export const addTrackToPlaylist = (track) => (dispatch, getState) => {
  const playlist = getState().player.playlist;

  if (!isInPlaylist(playlist, track.id)) {
    playerStore.setTrackInPlaylist(track.id);
  }

  if (!playlist.length) {
    dispatch(activateTrack(track.id));
  }
};

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
  const index = findIndex(isSameTrack(currentActiveTrackId), playlist);
  return playlist[index + iterate];
}

export const activateIteratedTrack = (currentActiveTrackId, iterate) => (dispatch, getState) => {
  const playlist = getState().player.playlist;
  const nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);

  if (nextActiveTrackId) {
    dispatch(activateTrack(nextActiveTrackId));
  } else {
    dispatch(togglePlayTrack(false));
  }
};

export const removeTrackFromPlaylist = (track) => (dispatch, getState) => {
  const activeTrackId = getState().player.activeTrackId;
  const isPlaying = getState().player.isPlaying;
  const isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

  if (isRelevantTrack) {
    dispatch(activateIteratedTrack(activeTrackId, 1));
  }

  const playlistSize = getState().player.playlist.length;
  if (playlistSize < 2) {
    playerStore.deactivateTrack();
    toggleStore.toggles[toggleTypes.PLAYLIST] = false;
  }

  playerStore.removeFromPlaylist(track.id);
};
