import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import * as sortTypes from '../../constants/sortTypes';
import { SORT_NAMES } from '../../constants/sort';
import { ButtonActive } from '../../components/ButtonActive';
import { ButtonInline } from '../../components/ButtonInline';
import sortStore from '../../stores/sortStore';
import { observer } from 'mobx-react';

function hasActiveSort(activeSort) {
  return activeSort !== sortTypes.NONE;
}

const Sort = observer(() => {
  const activeSort = sortStore.sortType;

  const sortIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': hasActiveSort(activeSort)
    }
  );

  return (
    <div className="stream-interaction">
      <div className={sortIconClass} title={'Sort Stream'}>
        <ButtonInline onClick={() => sortStore.setSortType(sortTypes.NONE)}>
          <i className="fa fa-sort" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {
          map((value, key) => {
            return (
              <span key={key}>
                <ButtonActive onClick={() => sortStore.setSortType(value)} isActive={value === activeSort}>
                  {SORT_NAMES[value]}
                </ButtonActive>
              </span>
            );
          }, sortTypes)
        }
      </div>
    </div>
  );
});

Sort.propTypes = {
  activeSort: React.PropTypes.string,
  onSort: React.PropTypes.func
};

export default Sort;
