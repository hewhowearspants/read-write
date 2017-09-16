import React from 'react';

const Footer = (props) => {
  return (
    <footer>
      <form onSubmit={props.searchBooks}>
        <input
          type="text"
          name="bookQuery"
          value={props.bookQuery}
          placeholder="find books"
          onChange={props.handleInputChange}
        />
        <input type="submit" value="Search" />
      </form>
    </footer>
  )
}

export default Footer