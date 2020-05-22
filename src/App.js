import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import * as BooksAPI from './BooksAPI';

import Home from './pages/Home';
import Search from './pages/Search';

import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.getSelectedBookShelf = this.getSelectedBookShelf.bind(this);
    this.state = {
      books: []
    }
  }

  async componentDidMount() {
    await this.getAllBooks()
  }

  async getAllBooks() {
    const books = await BooksAPI.getAll();
    this.setState({
      books
    });
  }

  async updateBookShelf(book, shelf) {
    await BooksAPI.update(book, shelf);
    this.getAllBooks();
  }

  getSelectedBookShelf(selectedBook) {
    let bookShelf = 'none';
    this.state.books.forEach((book) => {
        if (selectedBook.id === book.id) {
            bookShelf = book.shelf;
        }
    });
    return bookShelf;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home 
              books={this.state.books} 
              updateBookShelf={this.updateBookShelf} 
              getSelectedBookShelf={this.getSelectedBookShelf}
            />
          </Route>
          <Route path="/search">
            <Search 
              updateBookShelf={this.updateBookShelf} 
              getSelectedBookShelf={this.getSelectedBookShelf}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default BooksApp
