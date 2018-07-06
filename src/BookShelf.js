import React from 'react'
import AllBooks from "./Books";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {

    render() {
        let allBooks = this.props.books;
        let updateShelf = this.props.updateShelf;

        return (<div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            {<AllBooks
                                shelfBooks={allBooks}
                                currentShelf="currentlyReading"
                                updateShelf={updateShelf}
                            />}

                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want To Read</h2>
                            {<AllBooks
                                shelfBooks={allBooks}
                                currentShelf="wantToRead"
                                updateShelf={this.props.updateShelf}
                            />}

                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            {<AllBooks
                                shelfBooks={allBooks}
                                currentShelf="read"
                                updateShelf={this.props.updateShelf}
                            />}

                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        Search
                    </Link>
                </div>
            </div>

        )
    }
}

BookShelf.propTypes = {
    shelfBooks: PropTypes.array,
    currentShelf: PropTypes.string,
    updateShelf: PropTypes.func
};

export default BookShelf;