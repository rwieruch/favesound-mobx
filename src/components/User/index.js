import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../../actions/index';
import UserPreview from './preview';

const UserPreviewContainer = inject(
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

UserPreviewContainer.wrappedComponent.propTypes = {
  user: React.PropTypes.object,
  userStore: React.PropTypes.object,
};

export default UserPreviewContainer;
