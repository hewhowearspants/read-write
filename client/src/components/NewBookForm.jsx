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
        <input type="submit" value="Submit" />
        <button onClick={props.toggleCreateBook}>Cancel</button>
      </form>
    </div>
  )
}

export default NewBookForm