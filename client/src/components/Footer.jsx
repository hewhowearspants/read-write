import React from 'react';

// Footer contains the Google book API search form
const Footer = (props) => {
  return (
    <footer>
      <form className='book-search-form' onSubmit={props.searchBooks}>
        <input
          type="text"
          name="bookQuery"
          value={props.bookQuery}
          placeholder="find books"
          onChange={props.handleInputChange}
        />
        <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
      </form>
    </footer>
  )
}

export default Footer