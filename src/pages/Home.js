import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Bookshelf from '../components/Bookshelf';

class Home extends Component {
    filterBooksByShelfType(type) {
        const { books } = this.props;
        return books.filter((book) => book.shelf === type);
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf 
                            books={this.filterBooksByShelfType('currentlyReading')} 
                            title={'Currently Reading'} 
                        />
                        <Bookshelf 
                            books={this.filterBooksByShelfType('wantToRead')} 
                            title={'Want to Read'}
                        />
                        <Bookshelf 
                            books={this.filterBooksByShelfType('read')} 
                            title={'Read'} 
                        />
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.props.history.push('/search')}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);