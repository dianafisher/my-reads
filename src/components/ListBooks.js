import React, { Component } from 'react';
import Bookshelf from './BookShelf';

class ListBooks extends Component {

  // static propTypes = {
  //   books: PropTypes.array.isRequired
  // }

  render() {

    const books = this.props.books;

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Bookshelf title='Currently Reading'></Bookshelf>
            <Bookshelf title='Want to Read'></Bookshelf>
            <Bookshelf title='Read'></Bookshelf>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;
