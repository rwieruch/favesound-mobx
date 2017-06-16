import PropTypes from 'prop-types';
import React from 'react';

function Permalink({ link, text }) {
  return (
    <a href={link}>
      {text}
    </a>
  );
}

Permalink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
};

export default Permalink;
