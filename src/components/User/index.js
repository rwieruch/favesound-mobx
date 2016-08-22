import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import { UserPreview } from './preview';

export default inject(
  'userStore'
)(observer(({
  user,
  userStore
}) => {
  return (
    <UserPreview
      followings={userStore.followings}
      user={user}
      onFollow={actions.follow}
    />
  );
}));
