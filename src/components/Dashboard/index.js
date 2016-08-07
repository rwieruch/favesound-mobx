import React from 'react';
import { StreamActivitiesContainer } from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivitiesContainer />
      </div>
      <div className="dashboard-side">
        <FollowingsList />
        <FollowersList />
        <FavoritesList />
      </div>
    </div>
  );
}

export {
  Dashboard
};
