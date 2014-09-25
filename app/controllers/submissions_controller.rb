class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

  def create
    @submission = current_user.submissions.new(submission_params)

    if @submission.is_duplicate?
      flash.now[:error] = "Sorry, this song has already been submitted. Try another song!"
      render :new and return
    end

    if @submission.save
      flash[:success] = "Thanks! Your song was submitted and is now awaiting approval."
      redirect_to root_path
    else
      flash.now[:error] = "Submissions need a URL (from YouTube or Soundcloud), Artist, and Title filled out."
      render :new
    end
  end

  def show
    @submission = Submission.find_by_flat_name(params[:flat_name])
    @keep_headline = true

    if !@submission || @submission.status == Submission::STATUSES[:rejected]
      flash[:error] = "Song not found, sorry!"
      redirect_to root_path and return
    end

    @meta_data = "#{@submission.artist} - #{@submission.title}"
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
      user_upvote = Upvote.find_by_user_id_and_submission_id(current_user.id, @submission.id)
      @current_user_upvoted = user_upvote && !user_upvote.nullified
    end

    if current_user.site_admin
      @upvoters = User.where("id in (?)", Upvote.where(submission_id: @submission.id).map(&:user_id))
      @playlisters = User.where("id in (?)", Favorite.where(submission_id: @submission.id).map(&:user_id))
    end
  end

  def edit
    redirect_to root_path unless current_user.admin

    @submission = Submission.find_by_id(params[:id])
  end

  def update
    submission = Submission.find_by_id(params[:id])
    submission.update_attributes(edit_params)

    if request.xhr?
      render :json => {}
    else
      redirect_to approval_queue_path
    end
  end

  private

  def submission_params
    params.permit(:title, :artist, :url)
  end

  def edit_params
    params.permit(:status, :id, :published_at, :url, :artist, :title)
  end
end