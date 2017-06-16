import PropTypes from 'prop-types';
import React from 'react';

function ButtonInline({ onClick, children }) {
  return (
    <button className="button-inline" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

ButtonInline.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonInline;
