class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user

    if @comment.save
      @submission = @comment.submission
      submission_count = @submission.submission_count
      submission_count.comments += 1
      submission_count.save

      if request.xhr?
        render :json => @submission.comments.joins(:user).pluck(:id, :body, :created_at, "users.username", "users.avatar")
      else
        redirect_to submission_path(submission)
      end
    else
      if request.xhr?
        render :json => {fail: true}
      else
        flash[:error] = "Something went wrong with posting your comment. Comments have a 1000-character maximum length."
        redirect_to submission_path(submission)
      end
    end
  end

  def comment_params
    params.require(:comment).permit(:body, :submission_id)
  end
end