import React from 'react';
import PropTypes from 'prop-types'

// Author is a stateless functional component
function Author (props) {
  return (
    <div className='book-authors'>{props.name}</div>
  )
}

Author.propTypes = {
  name: PropTypes.string.isRequired
}

export default Author;
