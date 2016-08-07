import React from 'react';
import { observer } from 'mobx-react';
import * as actions from '../../actions/index';
import { UserPreview } from './preview';
import sessionStore from '../../stores/sessionStore';
import userStore from '../../stores/userStore';

export default observer(() => {
  return (
    <UserPreview
      followings={userStore.followings}
      user={sessionStore.user}
      onFollow={actions.follow}
    />
  );
});
