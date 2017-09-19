import React from 'react';

const NewBookForm = (props) => {
  return (
    <div className="bookcreateform">
      <form onSubmit={props.handleBookSubmit}>
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
        <input
          type="text"
          name="bookDescription"
          value={props.bookDescription}
          placeholder="description"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="bookGenre"
          value={props.bookGenre}
          placeholder="genre"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
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
        <div className='buttons'>
          <button className='submit-button' type="submit" title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
          <button className='cancel-button' onClick={props.toggleCreateBook} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
}

export default NewBookForm