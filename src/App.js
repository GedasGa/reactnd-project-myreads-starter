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

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home books={this.state.books} updateBookShelf={this.updateBookShelf}/>
          </Route>
          <Route path="/search">
            <Search updateBookShelf={this.updateBookShelf}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default BooksApp
