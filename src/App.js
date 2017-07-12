import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class App extends Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="App">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <ListBooks />
        )}
      </div>
    );
  }
}

export default App;
