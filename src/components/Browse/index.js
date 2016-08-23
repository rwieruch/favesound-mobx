import React from 'react';
import { observer, inject } from 'mobx-react';
import { DEFAULT_GENRE } from '../../constants/genre';
import { SORT_FUNCTIONS } from '../../constants/sort';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as actions from '../../actions/index';
import * as requestTypes from '../../constants/requestTypes';
import Activities from '../../components/Activities';

@inject('browseStore', 'entityStore', 'paginateStore', 'requestStore') @observer
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
    const { browseStore, entityStore, requestStore, location } = this.props;
    const genre = location.query.genre || DEFAULT_GENRE;

    return (
      <div className="browse">
        <Activities
          requestInProcess={requestStore.getRequestByType(requestTypes.GENRES)}
          ids={browseStore.getByGenre(genre)}
          entities={entityStore.getEntitiesByKey('tracks')}
          activeFilter={DURATION_FILTER_FUNCTIONS.ALL}
          activeSort={SORT_FUNCTIONS.NONE}
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
};

export default Browse;
