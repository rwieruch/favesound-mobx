import { observable } from 'mobx';

class SessionStore {

  @observable session;
  @observable user;

  constructor() {
    this.session = null;
    this.user = null;
  }

}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };
