import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Author from './Author';
import { Link } from 'react-router-dom';

class Book extends Component {

  constructor(props) {
    super(props);
    let shelf = props.data.shelf || 'none';
    // console.log(`${props.data.title} is on shelf '${shelf}'`);
    this.state = {value: shelf};
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    let shelf = e.target.value;
    this.setState( {value: shelf} );
    this.props.onUpdateBook(this.props.data, shelf);
  }

  render() {

    let book = this.props.data;

    // use a default thumbnail image if the book does not have imageLinks
    let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
    let shelf = this.props.data.shelf || 'none';

    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
          ></div>
          <div className={`book-shelf-status ${shelf}`}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          <Link className='book-details-link' to={`/book/${this.props.data.id}`}/>
        </div>
        <div className="book-title">{book.title}</div>
        { book.authors && (
          book.authors.map((author) => (
            <Author key={author} name={author}></Author>
          )))
        }
      </div>
    )
  }
}

export default Book;
