import React, { Component } from 'react';
import Bookshelf from './BookShelf';

class ListBooks extends Component {

  // static propTypes = {
  //   books: PropTypes.array.isRequired
  // }

  render() {

    const books = this.props.books;

    // filter the books by their shelf property

    let currentlyReading = books.filter((b) => b.shelf === 'currentlyReading');
    console.log(currentlyReading);
    let wantToRead = books.filter((b) => b.shelf === 'wantToRead');
    console.log(wantToRead);
    let read = books.filter((b) => b.shelf === 'read');
    console.log(read);

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Bookshelf title='Currently Reading' books={currentlyReading}></Bookshelf>
            <Bookshelf title='Want to Read' books={wantToRead}></Bookshelf>
            <Bookshelf title='Read' books={read}></Bookshelf>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;
