import React from 'react';

// title and author, as well as add to list button and more info button
const BookSearchSingle = (props) => {
  return (
    <div className='book-single'>
      <div className="book-single-top">
        <p>{props.book.title}</p>
        <p>{props.book.author}</p>
      </div>
      <div className="book-single-bottom">
        <div className="buttons">
          {props.auth ? (
            <button className='add-button' onClick={() => props.addBookToList(props.book.search_id)} title='Add to List'>
              <i className="fa fa-plus-circle" aria-hidden="true"></i><i className="fa fa-book" aria-hidden="true"></i>
            </button>
          ) : (
            <button className='add-button disabled' title='Log in to add to your List' disabled>
              <i className="fa fa-plus-circle" aria-hidden="true"></i> <i className="fa fa-book" aria-hidden="true"></i>
            </button>
          )}
          {props.bookToShow === props.book.search_id ? (
            <button className='book-info-toggle-button' onClick={() => props.setBookToShow(null)}><i className="fa fa-minus" aria-hidden="true"></i></button>
          ) : (
            <button className='book-info-toggle-button' onClick={() => props.setBookToShow(props.book.search_id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSearchSingle;