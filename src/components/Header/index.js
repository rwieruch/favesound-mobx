import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';
import { parse } from 'query-string';

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

function MenuItem({ selectedGenre, genre }) {
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
      {currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} />}
    </div>
  );
}

function MenuList({ selectedGenre }) {
  return (
    <div>
      {map((genre, idx) => {
        const menuItemProps = { genre, selectedGenre };
        return <MenuItem key={idx} { ...menuItemProps } />;
      }, GENRES)}
    </div>
  );
}

const Header = inject('sessionStore')(
  observer(({ location, sessionStore }) => {
    const genre = parse(location.search).genre || DEFAULT_GENRE;
    return (
      <div className="header">
        <div className="header-content">
          <Logo genre={genre} />
          <Route exact path={browse} render={() => <MenuList selectedGenre={genre} />} />
          <SessionAction currentUser={sessionStore.user} onLogin={actions.login} onLogout={actions.logout} />
        </div>
      </div>
    );
  }));

Header.wrappedComponent.propTypes = {
  sessionStore: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(Header);
