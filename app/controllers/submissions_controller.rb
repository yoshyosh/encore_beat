class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

  def create
    @submission = Submission.create(submission_params)
    redirect_to root_path
  end

  def show
    @submission = Submission.find_by_id(params[:id])
  end

  def edit
    submission = Submission.find_by_id(params[:id])

    submission.update_attributes(edit_params)
    render :json => {}
  end

  private

  def submission_params
    #TODO: Figure out way to default set approved to false, then submission will truly come from admins or preapproved users
    params.require(:submission).permit(:title, :artist, :url)
  end

  def edit_params
    params.permit(:status, :id, :published_at)
  end
end