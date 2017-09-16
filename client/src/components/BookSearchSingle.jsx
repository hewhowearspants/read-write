import React from 'react';
import Auth from '../modules/Auth';

const BookSearchSingle = (props) => {
  return (
    <div className={`book-${props.type}`}>
      <div className="book-single-top">
        <p>{props.book.title}</p>
        <p>{props.book.author}</p>
      </div>
      <div className="book-single-bottom">
        <div className="book-add-to-list">
          {Auth.isUserAuthenticated ? <button onClick={() => props.addBookToList(props.book.search_id)}>Add</button> : ''}
        </div>
        <div className="book-show-info">
          {props.bookToShow === props.book.search_id ? (
            <button onClick={() => props.setBookToShow(null)}>-</button>
          ) : (
            <button onClick={() => props.setBookToShow(props.book.search_id)}>+</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSearchSingle;