import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

function ButtonGhost({ onClick, isSmall, children }) {
  const buttonGhostClass = classNames(
    'button-ghost',
    {
      'button-ghost-small': isSmall
    }
  );

  return (
    <button className={buttonGhostClass} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

ButtonGhost.propTypes = {
  isSmall: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonGhost;
