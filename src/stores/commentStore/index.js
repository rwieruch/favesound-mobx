import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class CommentStore {

  @observable comments;
  @observable openComments;

  constructor() {
    this.comments = observable.map({});
    this.openComments = observable.map({});
  }

  @action setOpenComments = (id) => {
    this.openComments.set(id, !this.openComments.get(id));
  }

  @action mergeComments = (id, comments) => {
    if (!this.comments.get(id)) {
      this.comments.set(id, []);
    }

    forEach(comments, (comment) => this.comments.get(id).push(comment));
  }

}

const commentStore = new CommentStore();

export default commentStore;
export { CommentStore };
