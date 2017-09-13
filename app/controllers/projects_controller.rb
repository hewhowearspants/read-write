class ProjectsController < ApiController
  before_action :require_login
  before_action :set_project, except: [:index, :create]

  def index
    projects = current_user.projects.all
    render json: { projects: projects }
  end

  def show
    project_user = @project.user
    render json: { project: @project, username: project_user.username }
  end

  def create
    project = Project.new(project_params)
    project.user = current_user

    if project.save
      render json: {
        message: 'ok',
        project: project
      }
    else
      render json: {message: 'Could not create user project'}
    end
  end

  def update
    if @project.update(update_params)
      render json: {
        message: 'ok',
        project: @project
      }
    else
      render json: {message: 'Update project failed'}
    end
  end

  def destroy
    if @project.destroy!
      render json: { message: 'Project deleted' }
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :subtitle, :status, :synopsis)
  end

  def update_params
    params.require(:project).permit(:title, :subtitle, :status, :synopsis)
  end

  def set_project
    @project = current_user.projects.find(params[:id])
  end

end
