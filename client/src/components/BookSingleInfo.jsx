import React from 'react';

const BookSingleInfo = (props) => {
  // renders number of stars based on user's rating
  const renderRating = () => {
    let rating = []
    for(let i = 0; i < props.book.user_rating; i++) {
      rating.push(<span key={i}><i className="fa fa-star" aria-hidden="true"></i></span>)
    }
    return rating;
  }

  return (
    <div className="book-single-info">
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
          <p>{props.book.year}</p>
          <p>{props.book.genre}</p>
        </div>
      )}
      <div className="book-bottom">
        <div className='user-rating'>
          {renderRating()}
        </div>
        {props.bookToEdit !== props.book.id ? (
          <div className="links">
            <button className='edit-button' onClick={() => props.setBookToEdit(props.book.id)} title="Edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button className='delete-button' onClick={() => props.deleteBook(props.book.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
        ) : (
          <div className="links">
            <button className='submit-button' onClick={() => props.handleBookEditSubmit()} title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
            <button className='cancel-button' onClick={() => props.setBookToEdit(null)} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookSingleInfo;