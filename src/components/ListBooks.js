import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './BookShelf';


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {

    const books = this.props.books;

    // filter the books by their shelf property
    let currentlyReading = books.filter((b) => b.shelf === 'currentlyReading');
    let wantToRead = books.filter((b) => b.shelf === 'wantToRead');
    let read = books.filter((b) => b.shelf === 'read');

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Bookshelf title='Currently Reading' books={currentlyReading} onUpdateBook={this.props.onUpdateBook}></Bookshelf>
            <Bookshelf title='Want to Read' books={wantToRead} onUpdateBook={this.props.onUpdateBook}></Bookshelf>
            <Bookshelf title='Read' books={read} onUpdateBook={this.props.onUpdateBook}></Bookshelf>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;
