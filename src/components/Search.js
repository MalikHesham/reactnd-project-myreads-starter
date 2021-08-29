import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from ".././BooksAPI";

class Search extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
  };

  async fetchAllBooks() {
    await BooksAPI.getAll().then((books) => {
      this.setState({
        books,
      });
    });
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  updateShelf = async (newBook, shelf) => {
    await BooksAPI.update(newBook, shelf).then((res) => {
      newBook.shelf = shelf;
    });
  };

  async search(query) {
    if (query) {
      await BooksAPI.search(query)
        .then((searchedBooks) => {
          let searchResult = [];
          if (!searchedBooks.error) {
            for (let searchedBook of searchedBooks) {
              for (let book of this.state.books) {
                if (!book.authors) {
                  book.authors = "Unknown Author";
                }
                if (searchedBook.id === book.id) {
                  searchedBook.shelf = book.shelf;
                }
              }
              searchResult.push(searchedBook);
            }
          }
          return searchResult;
        })
        .then((searchedBooks) => {
          this.setState((prevSearchedBooks) => ({ searchedBooks }));
        })
        .catch((err) => alert(err.message));
    } else {
      this.setState({ searchedBooks: [] });
    }
  }

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
              <span />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
