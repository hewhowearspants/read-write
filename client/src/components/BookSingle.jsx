import React from 'react';

const BookSingle = (props) => {
  return (
    <div className={`book-${props.type}`}>
      <div className="book-single-top">
        <p>{props.book.title}</p>
        <p>{props.book.author}</p>
      </div>
      <div className="book-single-bottom">
        <div className="book-show-info" onClick={() => props.setBookToShow(props.book.id)}>
          {props.bookToShow === props.book.id ? <p>-</p> : <p>+</p>}
        </div>
      </div>
    </div>
  )
}

export default BookSingle;