import React from "react";
import {Route} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import "./App.css";
import SearchBook from "./SearchBook";
import PropTypes from "prop-types"

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books})
        })
    }

    updateShelf = (e, book) => {
        // console.log(e.target.value, book);
        const allbooks = this.state.books;
        let s = e.target.value;
        book.shelf = e.target.value;
        this.setState({allbooks})

        BooksAPI.update(book, s).then(() => {
            this.setState(state => ({
                books: state.books
                    .filter(result => result.id !== book.id)
                    .concat([book])
            }));
        });
    };

    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <BookShelf
                            books={this.state.books}
                            updateShelf={this.updateShelf}
                        />
                    )}
                />
                <Route
                    path='/search'
                    render={() => (
                        <SearchBook
                            books={this.state.books}
                            updateShelf={this.updateShelf}
                        />
                    )}
                />
            </div>
        )
    }


}

BooksApp.propTypes = {
    books: PropTypes.array,
    updateShelf: PropTypes.func
};
export default BooksApp
