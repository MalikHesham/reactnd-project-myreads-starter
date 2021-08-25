import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from ".././BooksAPI";

class Search extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
  };

  updateShelf = async (newBook, shelf) => {
    await BooksAPI.update(newBook, shelf).then((res) => {
      newBook.shelf = shelf;
    });
  };

  search = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then((books) => {
          let searchResults = [];
          if (!books.error) {
            for (let book of books) {
              if (book.authors) searchResults.push(book);
              else {
                book.authors = "Unknown Author";
                searchResults.push(book);
              }
            }
            return searchResults;
          }
        })
        .then((searchedBooks) => {
          this.setState((prvState) => ({ searchedBooks }));
        })

        .catch((err) => {
          this.setState({ searchedBooks: [] });
        });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(event) => this.search(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks ? (
              this.state.searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} updateShelf={this.updateShelf} />
                </li>
              ))
            ) : (
              <span></span>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
