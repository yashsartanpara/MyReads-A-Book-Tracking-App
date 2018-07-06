import React from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import AllBooks from './Books';
import PropTypes from 'prop-types'

class SearchBook extends React.Component {
    state = {
        str: "",
        foundBook: [],
        zero: false
    };

    // Find all the books which matches input string
    findBooks = string => {

        // If input is empty
        if (string.length === 0) {
            this.setState({foundBook: [], zero: true})
        }
        // If input has a string
        if (string.length > 0) {
            let searchResult = [];
            BooksAPI.search(string).then(results => {
                // If search returns any result put books according to shelf
                if (results.length > 0) {
                    // console.log(results)
                    searchResult = results.map(result => {
                        // console.log(data);
                        result.shelf = this.findShelf(result);
                        // console.log(result);
                        return result;
                    }).filter(all => {
                        return all.imageLinks !== undefined
                    });

                    this.setState({foundBook: searchResult, zero: false})
                }
                // if search returns nothing
                else {
                    this.setState({foundBook: [], zero: true})
                }
            }).catch((error) => {
                console.log('error');
            })
        }

        this.setState({
                str: string.trim()
            }
        )
    };


    // Assign shelf to found books
    findShelf(book) {
        // console.log(book)
        let bookShelf = this.props.books.filter(e => e.id === book.id);
        // console.log(bookShelf);
        if (bookShelf.length) {
            return bookShelf[0].shelf;
        }
        else
            return "none";
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">s
                        <input
                            onChange={e => this.findBooks(e.target.value)}
                            placeholder="Search by title or author"
                            type="text"
                        />

                    </div>
                </div>
                {this.state.zero && (
                    <div className="search-books-results">
                        Found 0 Books
                    </div>)}
                {this.state.zero === false && (
                    <div className="search-books-results">
                        {<AllBooks
                            shelfBooks={this.state.foundBook}
                            updateShelf={this.props.updateShelf}
                            currentShelf="none"
                        />}
                    </div>
                )}
            </div>
        )
    }

}

SearchBook
    .propTypes = {
    shelfBooks: PropTypes.array,
    currentShelf: PropTypes.string,
    updateShelf: PropTypes.func
};

export default SearchBook;