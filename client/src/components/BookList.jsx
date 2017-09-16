import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';
import BookSingle from './BookSingle';
import BookSingleInfo from './BookSingleInfo';
import NewBookForm from './NewBookForm';
import FeedbackModal from './FeedbackModal';

class BookList extends Component {
  constructor() {
    super();

    this.state = {
      bookData: null,
      bookDataLoaded: false,
      booksRead: false,
      bookToShow: null,
      bookToEdit: null,
      bookToRate: null,
      creatingBook: false,
      //form fields
      bookTitle: '',
      bookAuthor: '',
      bookDescription: '',
      bookGenre: '',
      bookYear: '',
      bookImage: '',
      bookRating: '',
      bookComment: '',
    }

    this.toggleBooksRead = this.toggleBooksRead.bind(this);
    this.toggleCreateBook = this.toggleCreateBook.bind(this);
    this.setBookToRate = this.setBookToRate.bind(this);
    this.setBookToShow = this.setBookToShow.bind(this);
    this.setBookToEdit = this.setBookToEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBookSubmit = this.handleBookSubmit.bind(this);
    this.handleBookEditSubmit = this.handleBookEditSubmit.bind(this);
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  // on load, resets App.js redirect state, gets user books
  componentDidMount() {
    this.props.setRedirect(null);
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

  // sets which book is showing more info
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

  // set which book is to be edited, fills in book info for form field states
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

  // set which book is to be rated when marking as read
  setBookToRate(id) {
    if (id) {
      this.setState({
        bookToRate: id,
        bookRating: '',
        bookComment: '',
      })
    } else {
      this.setState({
        bookToRate: null,
        bookRating: '',
        bookComment: '',
      })
    }
  }

  // toggles between read and unread books
  toggleBooksRead() {
    this.setState((prevState) => {
      return {
        booksRead: !prevState.booksRead,
        bookToShow: null,
        bookToEdit: null,
      }
    })
  }

  // toggles the book create form
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

  // sends book create request to server
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

  handleFeedbackSubmit(id) {
    var bookToRate = this.state.bookData.filter((book, index) => {
      if(book.id === id) {
        return book;
      }
    })[0];

    if (bookToRate.read === false) {
      bookToRate.read = true;
      bookToRate.user_rating = this.state.bookRating;
      bookToRate.user_comment = this.state.bookComment;
    } else {
      bookToRate.read = false;
      bookToRate.user_rating = null;
      bookToRate.user_comment = null;
    };

    axios(`/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        book: {
          read: bookToRate.read,
          user_rating: bookToRate.user_rating,
          user_comment: bookToRate.user_comment,
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
        bookRating: '',
        bookComment: '',
        bookToRate: null,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteBook(id) {
    axios(`/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res);
      const newBookData = [...this.state.bookData];
      newBookData.forEach((book, index, array) => {
        if (book.id === id) {
          array.splice(index, 1);
        }
      });
      this.setState({
        bookData: newBookData
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
              setBookToRate={this.setBookToRate}
              handleFeedbackSubmit={this.handleFeedbackSubmit}
            />
            {this.state.bookToShow === book.id ? 
              <BookSingleInfo
                book={book} 
                setBookToEdit={this.setBookToEdit}
                bookToEdit={this.state.bookToEdit}
                bookDescription={this.state.bookDescription}
                bookGenre={this.state.bookGenre}
                bookYear={this.state.bookYear}
                bookImage={this.state.bookImage}
                handleInputChange={this.handleInputChange}
                handleBookEditSubmit={this.handleBookEditSubmit}
                deleteBook={this.deleteBook}
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
        <FeedbackModal 
          show={this.state.bookToRate} 
          onClose={() => this.setBookToRate(null)}
          bookToRate={this.state.bookToRate}
          handleInputChange={this.handleInputChange}
          handleFeedbackSubmit={this.handleFeedbackSubmit}
        />
      </div>
    )
  }
}

export default BookList;