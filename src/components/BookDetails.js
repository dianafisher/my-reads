import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import { Link } from 'react-router-dom';

class BookDetails extends Component {

  // initialize state
  state = { details: {} };

  componentDidMount() {
    // the book id can be found in the params of the match object
    const bookId = this.props.match.params.id;

    // get the book details
    this.getBook(bookId);
  }

  getBook = (bookId) => {
    // call the BooksAPI to get the book details by it's ID
    BooksAPI.get(bookId).then((book) => {
      this.setState( {details: book} );
    });
  }

  render() {

    const details = this.state.details;    
    const thumbnail = details.imageLinks ? details.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

    return (
      <div className='book-details'>
        <Link className='close-search' to='/'>Close</Link>
        <div
          className='book-details-cover'
          style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
        ></div>
        <h3>Title</h3>
        <div className='book-details-title'>{details.title}</div>
        <h3>Description</h3>
        <div className='book-details-description'>{details.description}</div>
        <h3>Page Count</h3>
        <div className='book-details-pages'>{details.pageCount} pages</div>
        <h3>Author(s)</h3>
        { details.authors && (
          details.authors.map((author) => (
            <div key={author}>{author}</div>
          )))
        }
      </div>
    )
  }
}

export default BookDetails;
