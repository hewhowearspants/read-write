import React from 'react';

// import { Link } from 'react-router-dom';

const Book = (props) => {
  return (
    <div className="book">
      <div className="book-description">
        <p>{props.book.description}</p>
      </div>
      <div className="book-middle">
        <p>Year: {props.book.year}</p>
        <p>Genre: {props.book.genre}</p>
      </div>
      <div className="book-bottom">
        <div className="links">
        </div>
      </div>
    </div>
  )
}

export default Book;