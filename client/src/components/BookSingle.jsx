import React from 'react';

const BookSingle = (props) => {
  return (
    <div className={`book-${props.type}`}>
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
          {props.book.read ? <p onClick={() => props.handleFeedbackSubmit(props.book.id)}>Mark Unread</p> : <p onClick={() => props.setBookToRate(props.book.id)}>Mark Read</p>}
        </div>
        <div className="book-show-info" onClick={() => props.setBookToShow(props.book.id)}>
          {props.bookToShow === props.book.id ? <p>-</p> : <p>+</p>}
        </div>
      </div>
    </div>
  )
}

export default BookSingle;