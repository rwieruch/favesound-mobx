import React from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { addAccessTokenWith } from '../../services/api';
import { ButtonInline } from '../../components/ButtonInline';

@inject('sessionStore', 'entityStore', 'playerStore', 'toggleStore') @observer
class Player extends React.Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying } = this.props.playerStore;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { sessionStore, entityStore, playerStore, toggleStore } = this.props;
    const currentUser = sessionStore.user;
    const { activeTrackId, isPlaying, playlist } = playerStore;
    const userEntities = entityStore.getEntitiesByKey('users');
    const trackEntities = entityStore.getEntitiesByKey('tracks');

    if (!activeTrackId) { return null; }

    const track = trackEntities[activeTrackId];
    const { user, title, stream_url } = track;
    const { username } = userEntities[user];

    const playerClass = classNames(
      'player',
      {
        'player-visible': activeTrackId
      }
    );

    const playClass = classNames(
      'fa',
      {
        'fa-pause': isPlaying,
        'fa-play': !isPlaying
      }
    );

    const likeClass = classNames(
      'fa fa-heart',
      {
        'is-favorite': track.user_favorite
      }
    );

    return (
      <div className={playerClass}>
        <div className="player-content">
          <div className="player-content-action">
            <ButtonInline onClick={() => actions.activateIteratedTrack(activeTrackId, -1)}>
              <i className="fa fa-step-backward" />
            </ButtonInline>
          </div>
          <div className="player-content-action">
            <ButtonInline onClick={() => actions.togglePlayTrack(!isPlaying)}>
              <i className={playClass} />
            </ButtonInline>
          </div>
          <div className="player-content-action">
            <ButtonInline onClick={() => actions.activateIteratedTrack(activeTrackId, 1)}>
              <i className="fa fa-step-forward" />
            </ButtonInline>
          </div>
          <div className="player-content-name">
            {username} - {title}
          </div>
          <div className="player-content-action">
            <ButtonInline onClick={() => toggleStore.setToggle(toggleTypes.PLAYLIST)}>
              <i className="fa fa-th-list" /> {playlist.length}
            </ButtonInline>
          </div>
          <div className="player-content-action">
            {
              currentUser ?
                <ButtonInline onClick={() => actions.like(track)}>
                  <i className={likeClass} />
                </ButtonInline> : null
            }
          </div>
          <audio id="audio" ref="audio" src={addAccessTokenWith(stream_url, '?')}></audio>
        </div>
      </div>
    );
  }

}

Player.wrappedComponent.propTypes = {
  sessionStore: React.PropTypes.object,
  entityStore: React.PropTypes.object,
  playerStore: React.PropTypes.object,
  toggleStore: React.PropTypes.object,
};

export default Player;
