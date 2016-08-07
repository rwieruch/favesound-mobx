import { observable, action } from 'mobx';

class SessionStore {

  @observable session;
  @observable user;

  constructor() {
    this.session = null;
    this.user = null;
  }

  @action setMe = (me) => {
    this.user = me;
  }

  @action setSession = (session) => {
    this.session = session;
  }

  @action reset = () => {
    this.session = null;
    this.user = null;
  }

}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };
