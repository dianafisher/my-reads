import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

  state = {
    query: '',
    books: []
  }

  onSearch = (query) => {
    console.log('query', query);

    // make sure the query is greater than length 0
    if (query.length === 0) return;

    let maxResults = 20;
    BooksAPI.search(query, maxResults).then((results) => {
      console.log('results', results);
      if (results.error) {
        console.log(results.error);
        this.setState( {books: [] });
      } else {
        this.setState( {books: results} );
      }
    })
  }

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
                <Book data={book}></Book>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
