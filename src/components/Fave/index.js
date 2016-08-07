import React from 'react';
import { StreamActivitiesContainer } from '../../components/StreamActivities';
import { FollowersListContainer } from '../../components/FollowersList';
import { FollowingsListContainer } from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

function Fave() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivitiesContainer />
      </div>
      <div className="dashboard-side">
        <FollowingsListContainer />
        <FollowersListContainer />
        <FavoritesList />
      </div>
    </div>
  );
}

export {
  Fave
};
