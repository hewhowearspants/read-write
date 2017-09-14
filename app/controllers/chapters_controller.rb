class ChaptersController < ProjectsController
  before_action :require_login
  before_action :set_project
  before_action :set_chapter, except: [:index, :create]

  def index
    chapters = @project.chapters.all
    render json: { chapters: chapters }
  end

  def show
    chapter_project = @chapter.project
    render json: { chapter: @chapter, project_title: chapter_project.title}
  end

  def create
    chapter = Chapter.new(chapter_params)
    chapter.project = @project

    if chapter.save
      render json: {
        message: 'ok',
        chapter: chapter
      }
    else
      render json: {message: 'Could not create project chapter'}
    end
  end

  def update
    if @chapter.update(update_params)
      render json: {
        message: 'ok',
        chapter: @chapter
      }
    else
      render json: {message: 'Update chapter failed'}
    end
  end

  def destroy
    if @chapter.destroy!
      render json: {message: 'Chapter deleted'}
    end
  end

  private

  def set_project
    @project = current_user.projects.find(params[:project_id])
  end

  def set_chapter
    @chapter = @project.chapters.find(params[:id])
  end

  def chapter_params
    params.require(:chapter).permit(:chapter_number, :title, :content)
  end

  def update_params
    params.require(:chapter).permit(:chapter_number, :title, :content)
  end

end
