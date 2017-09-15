import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';
import BookSingle from './BookSingle';
import Book from './Book';
import NewBookForm from './NewBookForm';


class BookList extends Component {
  constructor() {
    super();

    this.state = {
      bookData: null,
      bookDataLoaded: false,
      booksRead: false,
      bookToShow: null,
      bookToEdit: null,
      creatingBook: false,
      //form fields
      bookTitle: '',
      bookAuthor: '',
      bookDescription: '',
      bookGenre: '',
      bookYear: '',
      bookImage: '',
    }

    this.toggleBooksRead = this.toggleBooksRead.bind(this);
    this.setBookToShow = this.setBookToShow.bind(this);
    this.setBookToEdit = this.setBookToEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBookSubmit = this.handleBookSubmit.bind(this);
    this.handleBookEditSubmit = this.handleBookEditSubmit.bind(this);
    this.toggleCreateBook = this.toggleCreateBook.bind(this);
  }

  componentDidMount() {
    axios.get('/books', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      this.setState({
        bookData: res.data.books,
        bookDataLoaded: true,
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  setBookToShow(id) {
    if (id !== this.state.bookToShow) {
      this.setState({
        bookToShow: id,
        bookToEdit: null
      })
    } else {
      this.setState({
        bookToShow: null,
        bookToEdit: null
      })
    }
  }

  setBookToEdit(id) {
    if (id) {
      const bookToEdit = this.state.bookData.filter((book) => {
        if (book.id === id) {
          return book;
        }
      })[0];
      this.setState({
        bookToEdit: id,
        bookTitle: bookToEdit.title,
        bookAuthor: bookToEdit.author,
        bookDescription: bookToEdit.description,
        bookGenre: bookToEdit.genre,
        bookYear: bookToEdit.year,
        bookImage: bookToEdit.image_url,
        creatingBook: false,
      })
    } else {
      this.setState({
        bookToEdit: null,
        bookTitle: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: '',
        bookYear: '',
        bookImage: '',
        creatingBook: false,
      })
    }
  }

  toggleBooksRead() {
    this.setState((prevState) => {
      return {
        booksRead: !prevState.booksRead,
        bookToShow: null,
        bookToEdit: null,
      }
    })
  }

  toggleCreateBook() {
    this.setState((prevState) => {
      return {
        bookTitle: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: '',
        bookYear: '',
        bookImage: '',
        creatingBook: !prevState.creatingBook,
        bookToEdit: null,
      }
    })
  }

  // generic input change for form fields
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // sends login request to server
  handleBookSubmit(event) {
    event.preventDefault();
    axios('/books', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          title: this.state.bookTitle,
          author: this.state.bookAuthor,
          description: this.state.bookDescription,
          genre: this.state.bookGenre,
          year: this.state.bookYear,
          image_url: this.state.bookImage,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return {
          bookData: prevState.bookData.concat(res.data.book),
          bookTitle: '',
          bookAuthor: '',
          bookDescription: '',
          bookGenre: '',
          bookYear: '',
          bookImage: '',
          creatingBook: false,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // sends book edit request to server
  handleBookEditSubmit() {
    //event.preventDefault();
    axios(`/books/${this.state.bookToEdit}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          title: this.state.bookTitle,
          author: this.state.bookAuthor,
          description: this.state.bookDescription,
          genre: this.state.bookGenre,
          year: this.state.bookYear,
          image_url: this.state.bookImage,
        }
      }
    }).then((res) => {
      console.log(res);
      // replace book in state with updated book
      const newBookData = [...this.state.bookData];
      newBookData.forEach((book, index, array) => {
        if (book.id === res.data.book.id) {
          array[index] = res.data.book;
        }
      });
      this.setState({
        bookData: newBookData,
        bookTitle: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: '',
        bookYear: '',
        bookImage: '',
        bookToEdit: null,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  showBooks() {
    const booksToShow = this.state.bookData.filter((book) => {
      if (book.read === this.state.booksRead) {
        return book;
      }
    });

    if (this.state.booksRead && booksToShow.length === 0) {
      return <p>You haven't read any books!</p>
    } else if (!this.state.booksRead && booksToShow.length === 0) {
      return <p>You have no books to read!</p>
    } else {
      return booksToShow.map((book) => {
        return (
          <div className='book-single-container' key={book.id}>
            <BookSingle 
              type="list" 
              book={book} 
              setBookToShow={this.setBookToShow} 
              bookToShow={this.state.bookToShow} 
              bookToEdit={this.state.bookToEdit}
              bookTitle={this.state.bookTitle}
              bookAuthor={this.state.bookAuthor}
              handleInputChange={this.handleInputChange} 
            />
            {this.state.bookToShow === book.id ? 
              <Book 
                book={book} 
                setBookToEdit={this.setBookToEdit}
                bookToEdit={this.state.bookToEdit}
                bookDescription={this.state.bookDescription}
                bookGenre={this.state.bookGenre}
                bookYear={this.state.bookYear}
                bookImage={this.state.bookImage}
                handleInputChange={this.handleInputChange}
                handleBookEditSubmit={this.handleBookEditSubmit}
              /> 
            : ''}
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className='booklist'>
        <div className='book-read-toggle'>
          <p>
            <span style={!this.state.booksRead ? {color:"red"} : {color:""}}>Unread </span> 
            <span onClick={this.toggleBooksRead}>-X-</span>
            <span style={this.state.booksRead ? {color:"red"} : {color:""}}> Read</span>
          </p>
        </div>
        {(this.state.bookDataLoaded ? this.showBooks() : <p>Loading...</p>)}
        {!this.state.creatingBook ? (
          <div className='book-create-button' onClick={this.toggleCreateBook}>
          <p>Add A Book</p>
          <p>+</p>
        </div>
        ) : (
          <NewBookForm 
            handleInputChange={this.handleInputChange} 
            handleBookSubmit={this.handleBookSubmit}
            toggleCreateBook={this.toggleCreateBook} 
            bookTitle={this.state.bookTitle}
            bookAuthor={this.state.bookAuthor}
            bookDescription={this.state.bookDescription}
            bookGenre={this.state.bookGenre}
            bookYear={this.state.bookYear}
            bookImage={this.state.bookImage}
          />
        )}
      </div>
    )
  }
}

export default BookList;