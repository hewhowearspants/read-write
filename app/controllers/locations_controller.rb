class LocationsController < ProjectsController
  before_action :require_login
  before_action :set_project
  before_action :set_location, except: [:index, :create]

  def index
    locations = @project.locations.all
    render json: { locations: locations }
  end

  def show
    location_project = @location.project
    render json: { location: @location, project_title: location_project.title}
  end

  def create
    location = Location.new(location_params)
    location.project = @project

    if location.save
      render json: {
        message: 'ok',
        location: location
      }
    else
      render json: {message: 'Could not create project location'}
    end
  end

  def update
    if @location.update(update_params)
      render json: {
        message: 'ok',
        location: @location
      }
    else
      render json: {message: 'Update location failed'}
    end
  end

  def destroy
    if @location.destroy!
      render json: {message: 'location deleted'}
    end
  end

  private

  def set_project
    @project = current_user.projects.find(params[:project_id])
  end

  def set_location
    @location = @project.locations.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :description)
  end

  def update_params
    params.require(:location).permit(:name, :description)
  end

end
