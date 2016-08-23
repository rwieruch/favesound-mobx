import React from 'react';
import { observer, inject } from 'mobx-react';
import { DEFAULT_GENRE } from '../../constants/genre';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import Activities from '../../components/Activities';
import StreamInteractions from '../../components/StreamInteractions';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import { SORT_FUNCTIONS } from '../../constants/sort';
import { getTracknameFilter } from '../../constants/nameFilter';
import { getAndCombined } from '../../services/filter';

@inject('browseStore', 'entityStore', 'paginateStore', 'requestStore', 'filterStore', 'sortStore') @observer
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
    const { location, paginateStore } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const nextHref = paginateStore.getLinkByType(genre);
    actions.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { location, browseStore } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const activitiesByGenre = browseStore.getByGenre(genre);
    return (activitiesByGenre ? activitiesByGenre.toJS() : []).length < 20;
  }

  render() {
    const { browseStore, entityStore, requestStore, filterStore, location, sortStore } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;
    const filters = [
      DURATION_FILTER_FUNCTIONS[filterStore.durationFilterType],
      getTracknameFilter(filterStore.query)
    ];

    return (
      <div className="browse">
        <StreamInteractions />
        <Activities
          requestInProcess={requestStore.getRequestByType(requestTypes.GENRES)}
          ids={browseStore.getByGenre(genre)}
          entities={entityStore.getEntitiesByKey('tracks')}
          activeFilter={getAndCombined(filters)}
          activeSort={SORT_FUNCTIONS[sortStore.sortType]}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
  }

}

Browse.wrappedComponent.propTypes = {
  browseStore: React.PropTypes.object.isRequired,
  entityStore: React.PropTypes.object.isRequired,
  paginateStore: React.PropTypes.object.isRequired,
  requestStore: React.PropTypes.object.isRequired,
  filterStore: React.PropTypes.object.isRequired,
  sortStore: React.PropTypes.object.isRequired,
};

export default Browse;
