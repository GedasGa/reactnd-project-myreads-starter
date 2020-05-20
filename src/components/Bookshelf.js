import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

class Bookshelf extends Component {

    async updateBookShelf(event, book, pageName) {
        const updatedBooks = await BooksAPI.update(book, event.target.value);

        this.setState({
            books: updatedBooks,
        });
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ this.props.title }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    { this.props.books.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    {/* TODO: Extract styles file */}
                                    <div 
                                        className="book-cover" 
                                        style={{ 
                                            width: 128, 
                                            height: 193, 
                                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})` 
                                        }} 
                                    />
                                    <div className="book-shelf-changer">
                                        <select 
                                            onChange={(event) => this.updateBookShelf(event, book)} 
                                            value={book.shelf}
                                        >
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                            </div>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf;
