import React from 'react';

const BookSingle = (props) => {
  return (
    <div className={`book-${props.type}`}>
      <div className="book-single-top">
        <p>{props.book.title}</p>
        <p>{props.book.author}</p>
      </div>
      <div className="book-single-bottom">
      </div>
    </div>
  )
}

export default BookSingle;