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

  // array of search terms used to populate type-ahead
  searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

  state = {
    query: '',
    books: [],
    matches: [],
    selected: -1
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

  /* findMatches() looks for a search term that matches the user's query
   *
   */
  findMatches = (query) => {
    return this.searchTerms.filter(term => {
      const regex = new RegExp(query, 'gi'); // global, case insensitive
      return term.match(regex);
    });
  }

  /* onSearch() checks that the query string has length greater than zero
   * then passes it on to efficientSearch()
   */
  onSearch = (query) => {
    // do not hit the server if the query has length 0
    if (query.length === 0) {
      return;
    }
    // pass the query on to the debounced function
    this.efficientSearch(query);
  }

  /* updateQuery() is called every time the user presses a key
   * in the search input
   */
  updateQuery = (query) => {
    console.log('query', query);

    // if the query has zero length, empty the books array
    if (query.length === 0) {
      this.setState( {books: [] });
    }

    // find matching search terms for type ahead functionality
    const matches = this.findMatches(query);

    // update our state with the query and matches
    this.setState({ query, matches });
  }

  /* keyDown() handles key presses on the search input element.
   * Keying down from the search input element should put the focus on
   * the first SearchSuggestion component
   */
  keyDown = (e) => {
    const code = e.keyCode;
    switch(code) {
      case 13: // enter
        this.onEnterKey();
        break;
      case 40:  // down
        this.onDownKey();
        break;
      case 38: // up
        this.onUpKey();
        break;
      default:
        break;
    }
  }

  /* onDownKey() increases the value of the selected SearchSuggestion component
   * index and updates the state.
   */
  onDownKey = () => {
    let idx = this.state.selected;
    idx = (idx + 1) % this.state.matches.length;
    this.setState( {selected: idx} );
  }

  /* onUpKey() decreases the value of the selected SearchSuggestion component
   * index and updates the state.
   */
  onUpKey = () => {
    let idx = this.state.selected;
    idx--;
    if (idx < 0) {
      idx = this.state.matches.length-1;
    }
    this.setState( {selected: idx} );
  }

  /* onEnterKey() takes the currently selected query match string and calls
   * the onSearch() function
   */
  onEnterKey = () => {
    // get the item at the current selected index
    let idx = this.state.selected;

    // make sure something is actually selected
    if (idx > -1) {
      const selectedMatch = this.state.matches[idx];
      console.log('selected', selectedMatch);

      // update our state with the selected match
      this.setState( {query: selectedMatch, matches: []});
      this.onSearch(selectedMatch);
    }

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
              onKeyDown={this.keyDown}
            />
          </div>
        </div>
        {(this.state.query.length > 0 &&
          <div className="search-books-suggestions">
            <ul>
              {this.state.matches.map((match, idx) => (
                <li className={idx === this.state.selected ? 'selected' : ''} key={match} >
                  <SearchSuggestion
                    key={match}
                    term={match}
                    query={this.state.query}
                  />
                </li>
              ))
              }

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
