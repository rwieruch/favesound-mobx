import { observable, action } from 'mobx';

class CommentStore {

  @observable comments;
  @observable openComments;

  constructor() {
    this.comments = {};
    this.openComments = {};
  }

  @action setOpenComments = (id) => {
    this.openComments[id] = !this.openComments[id];
  }

  @action mergeComments = (id, comments) => {
    this.comments = { ...this.comments, ...comments };
  }

}

const commentStore = new CommentStore();

export default commentStore;
export { CommentStore };
