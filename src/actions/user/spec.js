import * as actions from './index';
import * as actionTypes from '../../constants/actionTypes';

describe('mergeFavorites()', () => {

  it('creates an action to merge favorites', () => {
    const favorites = ['x', 'y'];
    const expectedAction = {
      type: actionTypes.MERGE_FAVORITES,
      favorites
    };

    expect(actions.mergeFavorites(favorites)).to.eql(expectedAction);
  });

});

describe('mergeFollowers()', () => {

  it('creates an action to merge followers', () => {
    const followers = ['x', 'y'];
    const expectedAction = {
      type: actionTypes.MERGE_FOLLOWERS,
      followers
    };

    expect(actions.mergeFollowers(followers)).to.eql(expectedAction);
  });

});

describe('mergeActivities()', () => {

  it('creates an action to merge activities', () => {
    const activities = ['x', 'y'];
    const expectedAction = {
      type: actionTypes.MERGE_ACTIVITIES,
      activities
    };

    expect(actions.mergeActivities(activities)).to.eql(expectedAction);
  });

});
