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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
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
