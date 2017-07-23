import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'

class SearchSuggestion extends PureComponent {

  highlightText = () => {
    const query = this.props.query;
    const regex = new RegExp({query}, 'gi');
    const text = this.props.term.replace(regex, `<span class='hl'>${query}</span>`);
    return `
        <span>${text}</span>
    `;
  }

  // // improve performance by preventing a re-render each time the user
  // // navigates through the list of SearchSuggestion components
  // shouldComponentUpdate(nextProps, nextState) {
  //   // do not update if the query prop has not changed
  //   return this.props.query !== nextProps.query;
  // }

  /* onMouseClick() passes the term value of this component back to the
   * parent component upon mouse clicks
   */
  onMouseClick = () => {
    // console.log('clicked on ', this.props.term);
    this.props.handleClick(this.props.term);
  }

  render() {
    const query = this.props.query;

    const regex = new RegExp(query, 'gi');
    const terms = this.props.term.split(regex);

    return (
      <div className='search-books-suggestion' onClick={this.onMouseClick}>
        { terms.map((t,idx) => {
          // console.log(idx);
          if (idx === terms.length-1) {
            return <span key={idx}>{t}</span>
          }
          return (<span key={idx}>{t}<span className='hl'>{query}</span></span>)
        })
        }
      </div>
    )
  }
}

SearchSuggestion.propTypes = {
  term: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default SearchSuggestion;
