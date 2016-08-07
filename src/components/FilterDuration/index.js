import React from 'react';
import { observer } from 'mobx-react';
import map from '../../services/map';
import classNames from 'classnames';
import * as filterTypes from '../../constants/filterTypes';
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter';
import { ButtonActive } from '../../components/ButtonActive';
import { ButtonInline } from '../../components/ButtonInline';
import filterStore from '../../stores/filterStore';

function hasActiveFilter(activeDurationFilter) {
  const { FILTER_DURATION_TRACK, FILTER_DURATION_MIX } = filterTypes;
  return activeDurationFilter === FILTER_DURATION_TRACK || activeDurationFilter === FILTER_DURATION_MIX;
}

const FilterDuration = observer(() => {
  const activeDurationFilter = filterStore.activeDurationFilter;

  const filterDurationIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveFilter(activeDurationFilter)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterDurationIconClass} title={'Filter Stream'}>
        <ButtonInline onClick={() => filterStore.filterDuration(filterTypes.ALL)}>
          <i className="fa fa-filter" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => filterStore.filterDuration(value)} isActive={value === activeDurationFilter}>
                  {DURATION_FILTER_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, filterTypes)
        }
      </div>
    </div>
  );
});

FilterDuration.propTypes = {
  activeDurationFilter: React.PropTypes.string,
  onDurationFilter: React.PropTypes.func
};

export default FilterDuration;
