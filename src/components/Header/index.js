import React from 'react';
import { observer } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router';
import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';
import sessionStore from '../../stores/sessionStore';

function getGenreLink(genre) {
  return browse + '?genre=' + genre;
}

function Logo({ genre }) {
  return (
    <div>
      <Link to={getGenreLink(genre)}>
        <h1>Favesound</h1>
      </Link>
    </div>
  );
}

function MenuItem({ pathname, selectedGenre, genre }) {
  if (pathname !== browse) { return null; }

  const linkClass = classNames(
    'menu-item',
    {
      'menu-item-selected': genre === selectedGenre
    }
  );

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
}

function Login({ onLogin }) {
  return (
    <Link onClick={onLogin} to={dashboard}>
      Login
    </Link>
  );
}

function Logout({ onLogout }) {
  return (
    <Link onClick={onLogout} to={browse}>
      Logout
    </Link>
  );
}

function SessionAction({ currentUser, onLogin, onLogout }) {
  return (
    <div>
      { currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} /> }
    </div>
  );
}

function MenuList({ selectedGenre, pathname }) {
  return (
    <div>
      {map((genre, idx) => {
        const menuItemProps = { genre, selectedGenre, pathname };
        return <MenuItem key={idx} { ...menuItemProps } />;
      }, GENRES)}
    </div>
  );
}

function Header({ currentUser, genre, pathname, onLogin, onLogout }) {
  return (
    <div className="header">
      <div className="header-content">
        <Logo genre={genre} />
        <MenuList selectedGenre={genre} pathname={pathname} />
        <SessionAction currentUser={currentUser} onLogin={onLogin} onLogout={onLogout} />
      </div>
    </div>
  );
}

Header.propTypes = {
  currentUser: React.PropTypes.object,
  genre: React.PropTypes.string,
  pathname: React.PropTypes.string,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
};

Header.defaultProps = {
  genre: DEFAULT_GENRE
};

export default observer(({ genre, pathname }) => {
  return (
    <Header
      currentUser={sessionStore.user}
      genre={genre}
      pathname={pathname}
      onLogin={actions.login}
      onLogout={actions.logout}
    />
  );
});
