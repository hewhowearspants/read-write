import React from 'react';

const Book = (props) => {
  return (
    <div className="book">
      {props.bookToEdit !== props.book.id ? (
        <div className="book-description">
          <p>{props.book.description}</p>
        </div>
      ) : (
        <div className="book-description">
          <input
            type="text"
            name="bookDescription"
            value={props.bookDescription}
            placeholder="description"
            onChange={props.handleInputChange}
          />
        </div>
      )}
      {props.bookToEdit === props.book.id ? (
        <div className="book-middle">
          <input
            type="text"
            name="bookGenre"
            value={props.bookGenre}
            placeholder="genre"
            onChange={props.handleInputChange}
          />
          <input
            type="number"
            name="bookYear"
            value={props.bookYear}
            placeholder="year"
            onChange={props.handleInputChange}
          />
          <input
            type="text"
            name="bookImage"
            value={props.bookImage}
            placeholder="cover image url"
            onChange={props.handleInputChange}
          />
        </div>
      ) : (
        <div className="book-middle">
          <p>Year: {props.book.year}</p>
          <p>Genre: {props.book.genre}</p>
        </div>
      )}
      <div className="book-bottom">
        {props.bookToEdit !== props.book.id ? (
          <div className="links">
            <span onClick={() => props.setBookToEdit(props.book.id)}>Edit</span>
            <span onClick={() => props.deleteBook(props.book.id)}>Delete</span>
          </div>
        ) : (
          <div className="links">
            <span onClick={() => props.handleBookEditSubmit()}>Submit</span>
            <span onClick={() => props.setBookToEdit(null)}>Cancel</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Book;