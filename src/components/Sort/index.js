import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import * as sortTypes from '../../constants/sortTypes';
import { SORT_NAMES } from '../../constants/sort';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';
import { observer, inject } from 'mobx-react';

function Sort({ activeSort, onSetSortType }) {
  const sortIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': activeSort !== sortTypes.NONE
    }
  );

  return (
    <div className="stream-interaction">
      <div className={sortIconClass} title={'Sort Stream'}>
        <ButtonInline onClick={() => onSetSortType(sortTypes.NONE)}>
          <i className="fa fa-sort" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => onSetSortType(value)} isActive={value === activeSort}>
                  {SORT_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, sortTypes)
        }
      </div>
    </div>
  );
}

const SortContainer = inject(
  'sortStore'
)(observer(({
  sortStore
}) => {
  return (
    <Sort
      activeSort={sortStore.sortType}
      onSetSortType={sortStore.setSortType}
    />
  );
}));

SortContainer.wrappedComponent.propTypes = {
  sortStore: PropTypes.object.isRequired
};

export default SortContainer;
