import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
    }

    async getSearchResults(query) {
        if (query) {
            let searchResults = await BooksAPI.search(query)
            if (searchResults.error) {
                searchResults = []
            }
            this.setState({
                searchResults
            })
        } else {
            this.setState({
                searchResults: []
            })
        }
    }

    render() {
        const { searchResults } = this.state;
        const { updateBookShelf, getSelectedBookShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">
                            Close
                        </button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                        autoFocus={true} 
                        type="text" 
                        placeholder="Search by title or author" 
                        onChange={(event) => this.getSearchResults(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map(book => 
                            <Book 
                                key={book.id} 
                                book={book} 
                                updateBookShelf={updateBookShelf}
                                getSelectedBookShelf={getSelectedBookShelf}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(Search);
