# require 'Httparty'

class BooksController < ApiController

  before_action :require_login, except: [:search, :query]
  before_action :set_book, except: [:index, :create, :search]

  # get all books for current user
  def index
    books = current_user.books.all
    render json: { books: books }
  end

  # get individual book info
  def show
    book_user = @book.user
    render json: { book: @book, username: book_user.username }
  end

  # create new book
  def create
    book = Book.new(book_params)
    book.user = current_user
    book.read = false

    if book.save
      render json: {
        message: 'ok',
        book: book,
      }
    else
      render json: {message: 'Could not create user book'}
    end
  end

  # update book info
  def update
    if @book.update(update_params)
      render json: {
        message: 'ok',
        book: @book
      }
    else
      render json: {message: 'Update book failed'}
    end
  end

  # delete book
  def destroy
    if @book.destroy!
      render json: { message: 'Book baleeted' }
    end
  end

  # search Google Books API based on parameter query
  def search
    @google = Rails.application.secrets.google_api_key
    puts query["query"]
    @response = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{query["query"]}&key=#{@google}")
    render json: {data: @response}
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :year, :genre, :image_url, :description)
  end

  def update_params
    params.require(:book).permit(:title, :author, :year, :genre, :image_url, :description, :read, :user_rating, :user_comment)
  end

  def query
    params.require(:book).permit(:query)
  end

  def set_book
    @book = current_user.books.find(params[:id])
  end

end
