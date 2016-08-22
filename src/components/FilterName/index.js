import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { ButtonInline } from '../../components/ButtonInline';
import { InputMenu } from '../../components/InputMenu';
import filterStore from '../../stores/filterStore';

const FilterName = observer(() => {
  const filterNameIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': filterStore.query
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterNameIconClass} title={'Search Stream'}>
        <ButtonInline onClick={() => filterStore.setFilterQuery('')}>
          <i className="fa fa-search" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        <InputMenu
          placeholder="SEARCH..."
          onChange={(event) => filterStore.setFilterQuery(event.target.value.toLowerCase())}
          value={filterStore.query}
        />
      </div>
    </div>
  );
});

FilterName.propTypes = {
  query: React.PropTypes.string,
  onNameFilter: React.PropTypes.func
};

export default FilterName;
