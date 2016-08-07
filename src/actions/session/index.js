import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentification';
import { apiUrl } from '../../services/api';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites } from '../../actions/user';
import userStore from '../../stores/userStore';
import sessionStore from '../../stores/sessionStore';

const fetchUser = () => (dispatch) => {
  fetch(apiUrl(`me`, '?'))
    .then(response => response.json())
    .then(me => {
      sessionStore.user = me;
      dispatch(fetchActivities());
      dispatch(fetchFavorites(me));
      dispatch(fetchFollowings(me));
      dispatch(fetchFollowers(me));
    });
};

export const login = () => (dispatch) => {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;
  /* eslint-disable no-undef */
  SC.initialize({ client_id, redirect_uri });

  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);
    sessionStore.session = session;
    dispatch(fetchUser());
  });
  /* eslint-enable no-undef */
};

export function logout() {
  Cookies.remove(OAUTH_TOKEN);

  sessionStore.user = null;
  sessionStore.session = null;

  userStore.followings = [];
  userStore.activities = [];
  userStore.typeReposts = {};
  userStore.typeTracks = {};
  userStore.followers = [];
  userStore.favorites = [];
}
