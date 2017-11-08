import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentification';
import { apiUrl } from '../../services/api';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites } from '../../actions/user';
import userStore from '../../stores/userStore';
import sessionStore from '../../stores/sessionStore';
import requestStore from '../../stores/requestStore';
import { AUTH } from '../../constants/requestTypes';

function fetchUser() {
  return fetch(apiUrl(`me`, '?'))
    .then((response) => response.json())
    .then((me) => {
      sessionStore.setMe(me);
      fetchActivities();
      fetchFavorites(me);
      fetchFollowings(me);
      fetchFollowers(me);
    });
}

export function login() {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;
  SC.initialize({ client_id, redirect_uri });
  requestStore.setRequestInProcess(AUTH, true);
  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);
    sessionStore.setSession(session);
    fetchUser().then(() => {
      requestStore.setRequestInProcess(AUTH, false);
    });
  }).catch(() => {
    requestStore.setRequestInProcess(AUTH, false);
  });
}

export function logout() {
  Cookies.remove(OAUTH_TOKEN);

  sessionStore.reset();
  userStore.reset();
}
