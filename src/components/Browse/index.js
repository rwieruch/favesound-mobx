import React from 'react';
import { observer, inject } from 'mobx-react';
import { DEFAULT_GENRE } from '../../constants/genre';
import { SORT_FUNCTIONS } from '../../constants/sort';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import Activities from '../../components/Activities';

@inject('browseStore', 'entityStore', 'paginateStore', 'requestStore') @observer
export default class Browse extends React.Component {

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
    const { location, paginateStore } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const nextHref = paginateStore.links[genre];
    actions.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { location, browseStore } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    return !browseStore.activitiesByGenre[genre] || activitiesByGenre[genre].length < 20;
  }

  render() {
    const { browseStore, entityStore, paginateStore, requestStore, location } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const browseActivities = browseStore.activitiesByGenre;
    const requestsInProcess = requestStore.requests;
    const paginateLinks = paginateStore.links;
    const trackEntities = entityStore.tracks;
    const userEntities = entityStore.users;

    if (browseStore.activitiesByGenre.get(genre)) {
      console.log(browseStore);
      console.log(browseStore.activitiesByGenre, genre, browseStore.activitiesByGenre.get(genre).toJS());
    }

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

// export default observer(({ location }) => {
//   return (
//     <Browse
//       genre={location.query.genre || DEFAULT_GENRE}
//       browseActivities={browseStore.activitiesByGenre}
//       requestsInProcess={requestStore.requests}
//       paginateLinks={paginateStore.links}
//       trackEntities={entityStore.tracks}
//       userEntities={entityStore.users}
//       fetchActivitiesByGenre={actions.fetchActivitiesByGenre}
//     />
//   );
// });
