class CommentsController < ApplicationController

  def create
    comment = Comment.create(comment_params)
  end

  def comment_params
    params.require(:comment).permit(:body, :user_id, :submission_id)
  end

end