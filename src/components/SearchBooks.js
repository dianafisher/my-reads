import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

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

  state = {
    query: '',
    books: []
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

  /* onSearch() checks that the query string has length greater than zero
   * then passes it on to efficientSearch()
   */
  onSearch = (query) => {
    console.log('query', query);

    // make sure the query is greater than length 0
    if (query.length === 0) return;

    // pass the query on to our debounced method
    this.efficientSearch(query);
  }

  /* updateQuery() is called every time the user presses a key
   * in the search input
   */
  updateQuery = (query) => {
    this.setState({ query })
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
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
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
