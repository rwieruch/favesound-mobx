import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import * as filterTypes from '../../constants/filterTypes';
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';

function hasActiveFilter(activeDurationFilter) {
  const { FILTER_DURATION_TRACK, FILTER_DURATION_MIX } = filterTypes;
  return activeDurationFilter === FILTER_DURATION_TRACK || activeDurationFilter === FILTER_DURATION_MIX;
}

function FilterDuration({
  durationFilterType,
  onSetFilterDuration
}) {
  const filterDurationIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveFilter(durationFilterType)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterDurationIconClass} title={'Filter Stream'}>
        <ButtonInline onClick={() => onSetFilterDuration(filterTypes.ALL)}>
          <i className="fa fa-filter" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => onSetFilterDuration(value)} isActive={value === durationFilterType}>
                  {DURATION_FILTER_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, filterTypes)
        }
      </div>
    </div>
  );
}

const FilterDurationContainer = inject(
  'filterStore'
)(observer(({
  filterStore
}) => {
  return (
    <FilterDuration
      durationFilterType={filterStore.durationFilterType}
      onSetFilterDuration={filterStore.setFilterDuration}
    />
  );
}));

FilterDurationContainer.wrappedComponent.propTypes = {
  filterStore: PropTypes.object.isRequired
};

export default FilterDurationContainer;
