import React from 'react';
import { StreamActivitiesContainer } from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import { FollowingsListContainer } from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivitiesContainer />
      </div>
      <div className="dashboard-side">
        <FollowingsListContainer />
        <FollowersList />
        <FavoritesList />
      </div>
    </div>
  );
}

export {
  Dashboard
};
