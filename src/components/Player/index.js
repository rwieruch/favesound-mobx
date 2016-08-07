import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import { addAccessTokenWith } from '../../services/api';
import { ButtonInline } from '../../components/ButtonInline';
import toggleStore from '../../stores/toggleStore';
import sessionStore from '../../stores/sessionStore';
import playerStore from '../../stores/playerStore';
import entityStore from '../../stores/entityStore';

class Player extends React.Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { isPlaying } = this.props;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  renderNav() {
    const {
      currentUser,
      activeTrackId,
      isPlaying,
      entities,
      playlist,
      onSetToggle,
      onActivateIteratedTrack,
      onLike,
      onTogglePlayTrack
    } = this.props;

    if (!activeTrackId) { return null; }

    const track = entities.tracks[activeTrackId];
    const { user, title, stream_url } = track;
    const { username } = entities.users[user];

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
      <div className="player-content">
        <div className="player-content-action">
          <ButtonInline onClick={() => onActivateIteratedTrack(activeTrackId, -1)}>
            <i className="fa fa-step-backward" />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onTogglePlayTrack(!isPlaying)}>
            <i className={playClass} />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onActivateIteratedTrack(activeTrackId, 1)}>
            <i className="fa fa-step-forward" />
          </ButtonInline>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => onSetToggle(toggleTypes.PLAYLIST)}>
            <i className="fa fa-th-list" /> {playlist.length}
          </ButtonInline>
        </div>
        <div className="player-content-action">
          {
            currentUser ?
            <ButtonInline onClick={() => onLike(track)}>
              <i className={likeClass} />
            </ButtonInline> : null
          }
        </div>
        <audio id="audio" ref="audio" src={addAccessTokenWith(stream_url, '?')}></audio>
      </div>
    );
  }

  render() {
    const playerClass = classNames(
      'player',
      {
        'player-visible': this.props.activeTrackId
      }
    );

    return <div className={playerClass}>{this.renderNav()}</div>;
  }

}

Player.propTypes = {
  currentUser: React.PropTypes.object,
  activeTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  entities: React.PropTypes.object,
  playlist: React.PropTypes.array,
  onTogglePlayTrack: React.PropTypes.func,
  onSetToggle: React.PropTypes.func,
  onActivateIteratedTrack: React.PropTypes.func,
  onLike: React.PropTypes.func
};

export default observer(() => {
  const entities = {
    users: entityStore.users,
    tracks: entityStore.tracks,
  };
  return (
    <Player
      currentUser={sessionStore.user}
      activeTrackId={playerStore.activeTrackId}
      isPlaying={playerStore.isPlaying}
      entities={entities}
      playlist={playerStore.playlist}
      onTogglePlayTrack={actions.togglePlayTrack}
      onSetToggle={toggleStore.setToggle}
      onActivateIteratedTrack={actions.activateIteratedTrack}
      onLike={actions.like}
    />
  );
});
