import React, { Component } from 'react';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  render() {
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <BookShelf title='Currently Reading'></BookShelf>
            <BookShelf title='Want to Read'></BookShelf>
            <BookShelf title='Read'></BookShelf>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;
