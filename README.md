# my-reads
MyReads is an app to keep track of books you have read or would like to read.

* Move books between one of three bookshelves (read, want to read, and currently reading).
* Search for additional books and add them to one of your bookshelves.  The search feature
includes type-ahead for easier searching.
* View more details of a book by clicking on the info icon in the top-left corner.

## Files Included
```
+--public/
 |-- index.html
 |-- favicon.ico - a bookshelf icon
+--src/
 +-- components/ - All React components except for the root component reside in this folder.
  |-- Author.js - A stateless functional component for displaying a book author.
  |-- Book.js - A component for each individual book.
  |-- BookDetails.js - A component to display additional details about a book.
  |-- BookShelf.js - A component to display an individual bookshelf of books.
  |-- ListBooks.js - A component to display the user's bookshelves.
  |-- SearchBooks.js - A component to search for books.
  |-- SearchSuggesion.js - A component to display individual search terms
 +-- icons/ - Icons found in the app.  All are SVG.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
  |-- bookmark-current.svg
  |-- bookmark-read.svg
  |-- bookmark-want.svg
  |-- info.svg
 +-- utils/ - Utility items such as API code can be found in here.
  |-- BooksAPI.js - A JavaScript API for the provided Udacity backend.
 |-- App.js - This is the root of the app.
 |-- App.css - Styles for the app.
 |-- App.test.js - Used for testing. Provided with Create React App.
 |-- index.css - Global styles.
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- README.MD - This README file.
|-- package.json - npm package manager file.
```

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation

npm install

## Running

npm start
