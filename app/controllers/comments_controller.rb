class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user

    if @comment.save
      @comment.submission.submission_counts.comments += 1

      if request.xhr?
        render :json => @comment.submission.comments
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