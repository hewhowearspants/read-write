class CharactersController < ProjectsController
  before_action :require_login
  before_action :set_project
  before_action :set_character, except: [:index, :create]

  # get list of characters for current project
  def index
    characters = @project.characters.all
    render json: { characters: characters }
  end

  # get individual character info
  def show
    character_project = @character.project
    render json: { character: @character, project_title: character_project.title}
  end

  # create new character
  def create
    character = Character.new(character_params)
    character.project = @project

    if character.save
      render json: {
        message: 'ok',
        character: character
      }
    else
      render json: {message: 'Could not create project character'}
    end
  end

  # update character info
  def update
    if @character.update(update_params)
      render json: {
        message: 'ok',
        character: @character
      }
    else
      render json: {message: 'Update character failed'}
    end
  end

  # delete character
  def destroy
    if @character.destroy!
      render json: {message: 'character deleted'}
    end
  end

  private

  def set_project
    @project = current_user.projects.find(params[:project_id])
  end

  def set_character
    @character = @project.characters.find(params[:id])
  end

  def character_params
    params.require(:character).permit(:name, :description)
  end

  def update_params
    params.require(:character).permit(:name, :description)
  end

end
