import React from 'react';

const BookSingle = (props) => {
  return (
    <div className='book-single'>
      {props.bookToEdit !== props.book.id ? (
        <div className="book-single-top">
          <p>{props.book.title}</p>
          <p>{props.book.author}</p>
        </div>
      ) : (
        <div className="book-single-top">
          <input
            type="text"
            name="bookTitle"
            value={props.bookTitle}
            placeholder="title"
            onChange={props.handleInputChange}
          />
          <input
            type="text"
            name="bookAuthor"
            value={props.bookAuthor}
            placeholder="author"
            onChange={props.handleInputChange}
          />
        </div>
      )}
      <div className="book-single-bottom">
        <div className="book-mark-read">
          {props.book.read ? (
            <button onClick={() => props.handleFeedbackSubmit(props.book.id)}>
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <i className="fa fa-circle-o" aria-hidden="true"></i>
            </button>
          ) : (
            <button onClick={() => props.setBookToRate(props.book.id)}>
              <i className="fa fa-circle-o" aria-hidden="true"></i>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <div className="book-show-info">
          {props.bookToShow === props.book.id ? (
            <button onClick={() => props.setBookToShow(null)}><i className="fa fa-minus" aria-hidden="true"></i></button>
          ) : (
            <button onClick={() => props.setBookToShow(props.book.id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSingle;