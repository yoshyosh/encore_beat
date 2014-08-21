class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

  def create
    @submission = current_user.submissions.create(submission_params)
    redirect_to root_path
  end

  def show
    @submission = Submission.find_by_id(params[:id])
    @comments = @submission.comments
  end

  def edit
    submission = Submission.find_by_id(params[:id])

    submission.update_attributes(edit_params)
    render :json => {}
  end

  private

  def submission_params
    params.require(:submission).permit(:title, :artist, :url)
  end

  def edit_params
    params.permit(:status, :id, :published_at)
  end
end