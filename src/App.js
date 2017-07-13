import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  getBook = (bookId) => {
    // call the BooksAPI to get the book by it's ID
    BooksAPI.get(bookId).then((book) => {
      console.log(book);
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((b) => {
      console.log('updated book', b);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={() => (
            <div>
              <ListBooks books={this.state.books} />
              <div className="open-search">
                <Link to="/search"></Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks />
          )}/>
          
          <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div>
      </Router>
    );
  }
}

export default App;
