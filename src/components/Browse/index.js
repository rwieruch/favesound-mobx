import React from 'react';
import { observer } from 'mobx-react';
import { DEFAULT_GENRE } from '../../constants/genre';
import { SORT_FUNCTIONS } from '../../constants/sort';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import Activities from '../../components/Activities';
import entityStore from '../../stores/entityStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';
import browseStore from '../../stores/browseStore';

class Browse extends React.Component {

  constructor(props) {
    super(props);
    this.fetchActivitiesByGenre = this.fetchActivitiesByGenre.bind(this);
  }

  componentDidMount() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  componentDidUpdate() {
    if (!this.needToFetchActivities()) { return; }
    this.fetchActivitiesByGenre();
  }

  fetchActivitiesByGenre() {
    const { genre, paginateLinks } = this.props;
    const nextHref = paginateLinks[genre];
    this.props.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { genre, browseActivities } = this.props;
    return !browseActivities[genre] || browseActivities[genre].length < 20;
  }

  render() {
    const { browseActivities, genre, requestsInProcess, trackEntities } = this.props;

    return (
      <div className="browse">
        <Activities
          requestInProcess={requestsInProcess[requestTypes.GENRES]}
          ids={browseActivities[genre]}
          entities={trackEntities}
          activeFilter={DURATION_FILTER_FUNCTIONS.ALL}
          activeSort={SORT_FUNCTIONS.NONE}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
  }

}

Browse.propTypes = {
  genre: React.PropTypes.string,
  browseActivities: React.PropTypes.object,
  requestsInProcess: React.PropTypes.object,
  paginateLinks: React.PropTypes.object,
  trackEntities: React.PropTypes.object,
  userEntities: React.PropTypes.object,
  fetchActivitiesByGenre: React.PropTypes.func
};

Browse.defaultProps = {
  genre: DEFAULT_GENRE
};

export default observer(({ location }) => {
  return (
    <Browse
      genre={location.query.genre}
      browseActivities={browseStore.activitiesByGenre}
      requestsInProcess={requestStore.requests}
      paginateLinks={paginateStore.links}
      trackEntities={entityStore.tracks}
      userEntities={entityStore.users}
      fetchActivitiesByGenre={actions.fetchActivitiesByGenre}
    />
  );
});
