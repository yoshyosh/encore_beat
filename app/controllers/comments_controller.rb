class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.save

    if request.xhr?
      render :json => @comment.submission.comments
    else
      redirect_to submission_path(submission)
    end
  end

  def comment_params
    params.require(:comment).permit(:body, :submission_id)
  end

end