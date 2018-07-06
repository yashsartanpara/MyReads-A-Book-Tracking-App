import React from 'react'

class AllBooks extends React.Component {
    render() {
        let bookProps = this.props;
        let currentShelf = bookProps.shelfBooks.filter(book => book.shelf === bookProps.currentShelf)
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {currentShelf.map(book => (

                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}></div>
                                    <div className="book-shelf-changer">
                                        <select onChange={e => bookProps.updateShelf(e, book)}
                                                value={book.shelf}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>

                    ))
                    }
                </ol>
            </div>)
    }
}

export default AllBooks;