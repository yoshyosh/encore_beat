class UpvotesController < ApplicationController
  def new
  end

  def create
  end

  def upvote_params
    params.require(:upvote).permit(:submission_id, :user_id)
  end
end