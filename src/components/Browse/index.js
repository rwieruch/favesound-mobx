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
    return browseStore.getByGenre(genre).length < 20;
  }

  render() {
    const { browseStore, entityStore, requestStore, location } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const trackEntities = entityStore.getEntitiesByKey('tracks');
    console.log(trackEntities, browseStore.getByGenre(genre));
    return (
      <div className="browse">
        <Activities
          requestInProcess={requestStore.getRequestByType(requestTypes.GENRES)}
          ids={browseStore.getByGenre(genre)}
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
  fetchActivitiesByGenre: React.PropTypes.func
};
