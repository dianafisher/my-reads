import React, { Component } from 'react';
import PropTypes from 'prop-types'

class SearchSuggestion extends Component {

  highlightText = () => {
    const query = this.props.query;
    const regex = new RegExp({query}, 'gi');
    const text = this.props.term.replace(regex, `<span class='hl'>${query}</span>`);
    return `
        <span>${text}</span>
    `;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // do not update if the query prop has not changed
    return this.props.query !== nextProps.query;
  }

  handleClick = () => {
    console.log(`clicked on ${this.props.term}`);
  }

  render() {
    const query = this.props.query;
    const regex = new RegExp(query, 'gi');

    // const highlighted = this.highlightText();
    const terms = this.props.term.split(regex);
    const result = regex.exec(this.props.term);
    const idx = result.index;
    console.log(terms);
    // console.log(highlighted);
    console.log(result);
    console.log('idx', idx);

    return (
      <div className='search-books-suggestion' onClick={this.handleClick}>
        { terms.map((t,idx) => {
          console.log(idx);
          if (idx === terms.length-1) {
            return <span key={idx}>{t}</span>
          }
          return (<span key={idx}>{t}<span className='hl'>{query}</span></span>)
        })
        }
        {/* <span className='hl'>{query}</span> */}
        {/* <span>{this.props.term}
          <span className='hl'>{query}
          </span>
        </span> */}
      </div>
    )
  }
}

SearchSuggestion.propTypes = {
  term: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
}

export default SearchSuggestion;