import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import StreamActivities from '../../components/StreamActivities';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import FavoritesList from '../../components/FavoritesList';
import * as requestTypes from '../../constants/requestTypes';

function Dashboard({ isAuthInProgress, isLoggedIn }) {
  if (isAuthInProgress) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivities />
      </div>
      <div className="dashboard-side">
        <FollowingsList />
        <FollowersList />
        <FavoritesList />
      </div>
    </div>
  );
}

const DashboardContainer = inject('sessionStore', 'requestStore')(
  observer(({ sessionStore, requestStore }) => {
    return (
      <Dashboard
        isAuthInProgress={requestStore.getRequestByType(requestTypes.AUTH)}
        isLoggedIn={sessionStore.session}
      />
    );
  }),
);

export default DashboardContainer;
