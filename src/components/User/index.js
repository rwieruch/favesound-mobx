import PropTypes from 'prop-types';
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
  user: PropTypes.object,
  userStore: PropTypes.object,
};

export default UserPreviewContainer;
