class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.new(user_params)
    if user.save
      render json: { token: user.auth_token }
    else
      render json: { error: user.errors.full_message }, status: 400
    end
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_books = Book.where(user_id: user.id)
    user_projects = Project.where(user_id: user.id)
    render json: {
      user: {
        username: user.username, 
        email: user.email,
        name: user.name
      },
      books: user_books,
      projects: user_projects,
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :name)
  end

end
