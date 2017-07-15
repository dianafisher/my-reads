import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import SearchSuggestion from './SearchSuggestion';

// debounce function taken from underscore.js
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

class SearchBooks extends Component {

  searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

  state = {
    query: '',
    books: [],
    matches: []
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  /* efficientSearch() uses debouncing to prevent a server request occurring
   * every time the user presses  a key
   */
  efficientSearch = debounce((query) => {
    const maxResults = 20;
    console.log('query', query);
    BooksAPI.search(query, maxResults).then((results) => {
      console.log('results', results);
      if (results.error) {
        console.log(results.error);
        this.setState( {books: [] });
      } else {
        this.updateShelfValues(results);
        this.setState( {books: results} );
      }
    })

  }, 25);

  /* updateShelfValues() updates the shelf value of books in the search results
   * to match the shelf value in our props.books
   */
  updateShelfValues = (results) => {
    let books = this.props.books;

    results.forEach((b) => {
      for (var i = 0; i < books.length; i++) {
        if (b.id === books[i].id) {
          b.shelf = books[i].shelf;
        }
      }
    });
  }

  findMatches = (query) => {
    return this.searchTerms.filter(term => {
      const regex = new RegExp(query, 'gi'); // global, case insensitive
      return term.match(regex);
    });
  }

  // displayMatches = (query) => {
  //   const matches = this.findMatches(query);
  //   this.setState({ matches })
  //   const html = matches.map(term => {
  //     // create a highlight
  //     const regex = new RegExp(query, 'gi');
  //     const text = term.replace(regex, `<span class='hl'>${query}</span>`);
  //     return `
  //       <li>
  //         <span>${text}</span>
  //       </li>
  //     `;
  //   }).join('');  // convert the array into a string
  //   return html;
  // }

  /* onSearch() checks that the query string has length greater than zero
   * then passes it on to efficientSearch()
   */
  onSearch = (query) => {
    // do not hit the server if the query has length 0
    if (query.length === 0) {
      return;
    }
    // pass the query on to our debounced method
    this.efficientSearch(query);
  }

  /* updateQuery() is called every time the user presses a key
   * in the search input
   */
  updateQuery = (query) => {
    console.log('query', query);

    // make sure the query is greater than length 0
    if (query.length === 0) {
      this.setState( {books: [] });
    }

    // find matching search terms for type ahead functionality
    const matches = this.findMatches(query);

    // const matchArray = this.displayMatches(query);
    // console.log(matchArray);

    // event.target.innerHTML = matchArray;
    // const suggestions = document.querySelector('.search-books-suggestions');
    // suggestions.innerHTML = matchArray;

    this.setState({ query, matches });
    this.onSearch(query);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="🔍  Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {(this.state.query.length > 0 &&
          <div className="search-books-suggestions">
            <ul>
              {this.state.matches.map((match) => (
                <li key={match} >
                  <SearchSuggestion term={match} query={this.state.query}/>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="search-books-results">
          <ol className='books-grid'>
            {this.state.books.map((book) =>(
              <li key={book.id} >
                <Book data={book} onUpdateBook={this.props.onUpdateBook}></Book>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}



export default SearchBooks;
