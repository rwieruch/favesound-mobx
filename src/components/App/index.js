import React from 'react';
import { DEFAULT_GENRE } from '../../constants/genre';
import Header from '../../components/Header';
import { PlayerContainer } from '../../components/Player';
import { PlaylistContainer } from '../../components/Playlist';

export default class App extends React.Component {

  render() {
    const { location, children } = this.props;
    const { pathname, query } = location;
    const genre = query.genre || DEFAULT_GENRE;

    return (
      <div>
        <Header genre={genre} pathname={pathname} />
          {children}
        <PlaylistContainer />
        <PlayerContainer />
      </div>
    );
  }

}
