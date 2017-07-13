import React from 'react';
import PropTypes from 'prop-types'

function Author (props) {
  return (
    <div className='book-authors'>{props.name}</div>
  )
}

Author.propTypes = {
  name: PropTypes.string.isRequired
}

export default Author;
