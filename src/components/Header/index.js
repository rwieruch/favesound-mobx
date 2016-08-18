import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router';
import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';

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
  if (pathname === dashboard) { return null; }

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

const Header = inject(
  'sessionStore'
)(observer(({
  genre,
  pathname,
  sessionStore
}) => {
  return (
    <div className="header">
      <div className="header-content">
        <Logo genre={genre} />
        <MenuList selectedGenre={genre} pathname={pathname} />
        <SessionAction currentUser={sessionStore.user} onLogin={actions.login} onLogout={actions.logout} />
      </div>
    </div>
  );
}));

Header.propTypes = {
  sessionStore: React.PropTypes.object,
  genre: React.PropTypes.string,
  pathname: React.PropTypes.string,
};

Header.wrappedComponent.defaultProps = {
  genre: DEFAULT_GENRE
};

export default Header;
