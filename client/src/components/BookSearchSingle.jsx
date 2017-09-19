import React from 'react';

const BookSearchSingle = (props) => {
  return (
    <div className='book-single'>
      <div className="book-single-top">
        <p>{props.book.title}</p>
        <p>{props.book.author}</p>
      </div>
      <div className="book-single-bottom">
        <div className="book-add-to-list">
          {props.auth ? <button onClick={() => props.addBookToList(props.book.search_id)}>Add</button> : <p>Log in to add</p>}
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