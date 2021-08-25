import React from "react";
import Book from "./Book";
import * as BooksAPI from ".././BooksAPI";

class Shelf extends React.Component {
  state = {
    books: [],
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

  componentDidUpdate() {
    this.fetchAllBooks();
  }

  updateShelf = async (newBook, shelf) => {
    await BooksAPI.update(newBook, shelf).then((res) => {
      newBook.shelf = shelf;
    });

    let updatedBooks = this.state.books.filter(
      (book) => book.id !== newBook.id
    );
    updatedBooks.push(newBook);
    this.setState({ books: updatedBooks });
  };

  render() {
    const books = this.state.books;
    const shelfType = this.props.shelfType;
    const shelfBooks = books.filter((book) => book.shelf === shelfType);

    return (
      <div>
        <div className="bookshelf">
          <center>
            <h2 className="bookshelf-title">
              {shelfType === "currentlyReading"
                ? "Currently Reading"
                : shelfType === "wantToRead"
                ? "Want to Read"
                : "Read"}
            </h2>
          </center>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {shelfBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} updateShelf={this.updateShelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
