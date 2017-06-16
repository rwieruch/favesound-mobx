import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import map from '../../services/map';

export function InfoItem({ infoItem }) {
  const infoItemClass = classNames(
    'info-list-item',
    {
      'info-list-item-active': infoItem.activeSort
    }
  );

  return (
    <div className={infoItemClass}>
      <i className={infoItem.className} /> {infoItem.count}
    </div>
  );
}

function InfoList({ information }) {
  return (
    <div className="info-list">
      {map((infoItem, idx) => {
        return <InfoItem key={idx} infoItem={infoItem} />;
      }, information)}
    </div>
  );
}

InfoList.propTypes = {
  information: PropTypes.array
};

export default InfoList;
