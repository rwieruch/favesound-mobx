import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { DEFAULT_GENRE } from '../../constants/genre';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import Activities from '../../components/Activities';
import StreamInteractions from '../../components/StreamInteractions';
import { parse } from 'query-string';

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

  parseGenreFromLocation(location) {
    return parse(location.search).genre || DEFAULT_GENRE;
  }

  fetchActivitiesByGenre() {
    const { location, paginateStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    const nextHref = paginateStore.getLinkByType(genre);
    actions.fetchActivitiesByGenre(nextHref, genre);
  }

  needToFetchActivities() {
    const { location, browseStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    const activitiesByGenre = browseStore.getByGenre(genre);
    return (activitiesByGenre ? activitiesByGenre.toJS() : []).length < 20;
  }

  render() {
    const { browseStore, entityStore, requestStore, filterStore, location, sortStore } = this.props;
    const genre = this.parseGenreFromLocation(location);
    return (
      <div className="browse">
        <StreamInteractions />
        <Activities
          requestInProcess={requestStore.getRequestByType(requestTypes.GENRES)}
          ids={browseStore.getByGenre(genre)}
          entities={entityStore.getEntitiesByKey('tracks')}
          activeFilter={filterStore.combinedFilters}
          activeSort={sortStore.sortFn}
          scrollFunction={this.fetchActivitiesByGenre}
        />
      </div>
    );
  }

}

Browse.wrappedComponent.propTypes = {
  browseStore: PropTypes.object.isRequired,
  entityStore: PropTypes.object.isRequired,
  paginateStore: PropTypes.object.isRequired,
  requestStore: PropTypes.object.isRequired,
  filterStore: PropTypes.object.isRequired,
  sortStore: PropTypes.object.isRequired,
};

export default Browse;
