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


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home books={this.state.books}/>
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default BooksApp
