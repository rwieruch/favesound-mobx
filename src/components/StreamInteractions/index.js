import React from 'react';
import { FilterDurationContainer } from '../../components/FilterDuration';
import Sort from '../../components/Sort';
import { FilterNameContainer } from '../../components/FilterName';

function StreamInteractions() {
  return (
    <div className="stream-interactions">
      <div className="stream-interactions-item">
        <FilterDurationContainer />
      </div>
      <div className="stream-interactions-item">
        <Sort />
      </div>
      <div className="stream-interactions-item">
        <FilterNameContainer />
      </div>
    </div>
  );
}

export {
  StreamInteractions,
};
