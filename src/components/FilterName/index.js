import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { ButtonInline } from '../../components/ButtonInline';
import { InputMenu } from '../../components/InputMenu';
import filterStore from '../../stores/filterStore';

const FilterName = observer(() => {
  const filterNameQuery = filterStore.filterNameQuery;

  const filterNameIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': filterNameQuery
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterNameIconClass} title={'Search Stream'}>
        <ButtonInline onClick={() => filterStore.nameFilter('')}>
          <i className="fa fa-search" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        <InputMenu
          placeholder="SEARCH..."
          onChange={(event) => filterStore.nameFilter(event.target.value.toLowerCase())}
          value={filterNameQuery}
        />
      </div>
    </div>
  );
});

FilterName.propTypes = {
  filterNameQuery: React.PropTypes.string,
  onNameFilter: React.PropTypes.func
};

export default FilterName;
