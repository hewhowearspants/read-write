import React from 'react';

const BookSearchSingleInfo = (props) => {
  return (
    <div className="book-single-info">
      <div className="book-description">
        <p>{props.book.description}</p>
      </div>
      <div className="book-middle">
        <p>{props.book.year}</p>
        <p>{props.book.genre}</p>
      </div>
    </div>
  )
}

export default BookSearchSingleInfo;