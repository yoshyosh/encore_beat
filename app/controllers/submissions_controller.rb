class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

  def create
    @submission = current_user.submissions.new(submission_params)

    if @submission.save
      flash[:success] = "Your song was submitted, awaiting approval"
      redirect_to root_path
    else
      flash.now[:error] = "Submissions need a URL (from YouTube or Soundcloud), Artist, and Title filled out."
      render :new
    end
  end

  def show
    @submission = Submission.find_by_flat_name(params[:flat_name])
    redirect_to root_path if @submission.status == Submission::STATUSES[:rejected]

    @comments = @submission.comments.joins(:user).pluck(:id, :body, :created_at, "users.username", "users.avatar")

    @presenter = {
      comments: @comments,
      user: current_user || false,
      submission_id: @submission.id,
      form: {
        action: comments_path,
        csrf_param: request_forgery_protection_token,
        csrf_token: form_authenticity_token
      }
    }

    if current_user
      @current_user_upvoted = !!Upvote.find_by_user_id_and_submission_id(current_user.id, @submission.id)
    end
  end

  def edit
    submission = Submission.find_by_id(params[:id])

    submission.update_attributes(edit_params)
    render :json => {}
  end

  private

  def submission_params
    params.permit(:title, :artist, :url)
  end

  def edit_params
    params.permit(:status, :id, :published_at)
  end
end