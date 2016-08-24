import { CommentStore } from './';

describe('CommentStore', () => {

  const comment = 'foo';
  const commentKey = 'bar';

  describe('constructor()', () => {
    it('has an initial state', () => {
      const store = new CommentStore();
      expect(store.comments.toJS()).to.be.empty;
      expect(store.openComments.toJS()).to.be.empty;
    });
  });

  describe('setOpenComments()', () => {
    it('sets a list of comments to open ans vice versa', () => {
      const store = new CommentStore();
      store.setOpenComments(commentKey);
      expect(store.openComments.get(commentKey)).to.be.true;
      store.setOpenComments(commentKey);
      expect(store.openComments.get(commentKey)).to.be.false;
    });
  });

  describe('mergeComments()', () => {
    it('merges comments in a list under a key', () => {
      const store = new CommentStore();
      store.mergeComments(commentKey, [comment]);
      expect(store.comments.get(commentKey).toJS()).to.have.length(1);
      store.mergeComments(commentKey, [comment]);
      expect(store.comments.get(commentKey).toJS()).to.have.length(2);
    });
  });

});
