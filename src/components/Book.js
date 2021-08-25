import React from "react";
import BookOptions from "./BookOptions";
import noCoverFound from "../icons/noCoverFound.jpg";

class Book extends React.Component {
  render() {
    const { book } = this.props;
    const imgUrl =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : noCoverFound;
    const author = book.authors;
    const bookTitle = book.title;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imgUrl})`,
            }}
          />
          <BookOptions updateShelf={this.props.updateShelf} book={book} />
        </div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}

export default Book;
