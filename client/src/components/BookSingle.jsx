import React from 'react';

// component renders the title and author in BookList, and contains More Info and Mark Read/Unread buttons
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
        <div className="buttons">
          {props.book.read ? (
            <button className='mark-read-toggle-button' onClick={() => props.handleFeedbackSubmit(props.book.id)} title="Mark Unread">
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <i className="fa fa-circle-o" aria-hidden="true"></i>
            </button>
          ) : (
            <button className='mark-read-toggle-button' onClick={() => props.setBookToRate(props.book.id)} title="Mark Read and Rate">
              <i className="fa fa-circle-o" aria-hidden="true"></i>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
            </button>
          )}
          {props.bookToShow === props.book.id ? (
            <button className='book-info-toggle-button' onClick={() => props.setBookToShow(null)} title='Show Less'><i className="fa fa-minus" aria-hidden="true"></i></button>
          ) : (
            <button className='book-info-toggle-button' onClick={() => props.setBookToShow(props.book.id)} title='Show More'><i className="fa fa-plus" aria-hidden="true"></i></button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookSingle;