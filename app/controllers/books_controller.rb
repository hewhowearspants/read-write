class BooksController < ApiController
  before_action :require_login
  before_action :set_book, except: [:index, :create]

  def index
    books = current_user.books.all
    render json: { books: books }
  end

  def show
    book_user = @book.user
    render json: { book: @book, username: book_user.username }
  end

  def create
    book = Book.new(book_params)
    book.user = current_user

    if book.save
      render json: {
        message: 'ok',
        book: book,
      }
    else
      render json: {message: 'Could not create user book'}
    end
  end

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

  def destroy
    if @book.destroy!
      render json: { message: 'Book baleeted' }
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :year, :genre, :image_url, :description)
  end

  def update_params
    params.require(:book).permit(:title, :author, :year, :genre, :image_url, :description)
  end

  def set_book
    @book = current_user.books.find(params[:id])
  end

end