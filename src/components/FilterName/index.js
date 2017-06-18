import PropTypes from 'prop-types';
import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import ButtonInline from '../../components/ButtonInline';
import InputMenu from '../../components/InputMenu';

function FilterName({
  query,
  onSetFilterQuery
}) {
  const filterNameIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': query
    }
  );

  return (
    <div className="stream-interaction">
      <div className={filterNameIconClass} title={'Search Stream'}>
        <ButtonInline onClick={() => onSetFilterQuery('')}>
          <i className="fa fa-search" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        <InputMenu
          placeholder="SEARCH..."
          onChange={(event) => onSetFilterQuery(event.target.value.toLowerCase())}
          value={query}
        />
      </div>
    </div>
  );
}

const FilterNameContainer = inject(
  'filterStore'
)(observer(({
  filterStore
}) => {
  return (
    <FilterName
      query={filterStore.query}
      onSetFilterQuery={filterStore.setFilterQuery}
    />
  );
}));

FilterNameContainer.wrappedComponent.propTypes = {
  filterStore: PropTypes.object.isRequired
};

export default FilterNameContainer;
