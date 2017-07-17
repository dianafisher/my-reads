import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';

class BookDetails extends Component {

  // constructor(props) {
  //   super(props);
  //
  //   console.log(this.props);
  //
  // }

  componentDidMount() {
    // the book id can be found in the params of the match object
    const bookId = this.props.match.params.id;
    console.log('calling getBook for book id', bookId);
    this.getBook(bookId);
  }

  getBook = (bookId) => {
    // call the BooksAPI to get the book by it's ID
    BooksAPI.get(bookId).then((book) => {
      console.log(book);
    });
  }

  render() {
    return (
      <div className='book-details'>
        <div>Book Details...</div>
      </div>
    )
  }
}

export default BookDetails;
